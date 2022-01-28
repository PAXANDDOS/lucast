import InfoModal from '@/components/Modals/InfoModal'
import SettingsModal from '@/components/Modals/SettingsModal'
import style from '@/styles/home.module.scss'
import store from '@/utils/electron-store'
import type { DesktopCapturerSource } from 'electron'
import type { MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
	Info,
	RecordStart,
	RecordStop,
	Settings,
	ShareScreen,
} from '../assets/icons/Misc'

type State = {
	label: string
	source: string
	startActive: boolean
	stopActive: boolean
}

type ModalState = {
	info: boolean
	settings: boolean
}

type BindsState = {
	start: string
	stop: string
}

const HomePage = () => {
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>()
	const [state, setState] = useState<State>({
		label: 'Start recording',
		source: 'Select source',
		startActive: false,
		stopActive: false,
	})
	const [modal, setModal] = useState<ModalState>({
		info: false,
		settings: false,
	})
	const [binds, setBinds] = useState<BindsState>({
		start: 'No bind',
		stop: 'No bind',
	})
	const ref = useRef<HTMLVideoElement>(null)
	const recordedChunks: Blob[] = []

	const getSources = async () => {
		const sources = await window.ipcRenderer.invoke('get-input-sources', [
			'screen',
			'window',
		])
		window.ipcRenderer.send('show-input-sources', JSON.stringify(sources))

		window.ipcRenderer.on(
			'input-source-selected',
			async (e, source: DesktopCapturerSource) => {
				if (!ref.current) return

				const mediaDevices = navigator.mediaDevices as any
				const stream = await mediaDevices.getUserMedia({
					audio: false,
					video: {
						mandatory: {
							chromeMediaSource: 'desktop',
							chromeMediaSourceId: source.id,
						},
					},
				})

				ref.current.srcObject = stream
				ref.current.play()

				const newMediaRecorder = new MediaRecorder(stream, {
					mimeType: 'video/webm; codecs=vp9',
				})
				newMediaRecorder.ondataavailable = handleDataAvailable
				newMediaRecorder.onstop = handleStopRecorder
				setMediaRecorder(newMediaRecorder)
				setState({
					...state,
					startActive: true,
					source:
						source.name.length > 13
							? `${source.name.slice(0, 11)}..`
							: source.name,
				})
			}
		)
	}

	const handleDataAvailable = (e: BlobEvent) => recordedChunks.push(e.data)

	const handleStopRecorder = async () => {
		const blob = new Blob(recordedChunks, {
			type: 'video/webm; codecs=vp9',
		})
		window.ipcRenderer.send('save-blob', await blob.arrayBuffer())
	}

	const handleStart = useCallback(() => {
		mediaRecorder?.start()
		setState({
			...state,
			label: 'Recording...',
			startActive: false,
			stopActive: true,
		})
	}, [mediaRecorder, state])

	const handleStop = useCallback(() => {
		mediaRecorder?.stop()
		setState({
			...state,
			label: 'Start recording',
			startActive: true,
			stopActive: false,
		})
	}, [mediaRecorder, state])

	const handleModalChange = ({ currentTarget }: MouseEvent) => {
		const element = currentTarget as HTMLButtonElement
		setModal({
			...modal,
			[element.name]: !(element.ariaChecked === 'true' && true),
		})
	}

	useEffect(() => {
		const startPromise = store.get('startRecord')
		const stopPromise = store.get('stopRecord')
		Promise.all([startPromise, stopPromise]).then(
			([startResult, stopResult]) => {
				setBinds({
					start: startResult,
					stop: stopResult,
				})
			}
		)

		window.ipcRenderer.on(
			'start-recording',
			() => state.startActive && handleStart()
		)
		window.ipcRenderer.on(
			'stop-recording',
			() => state.stopActive && handleStop()
		)
	}, [handleStart, handleStop, state.startActive, state.stopActive])

	return (
		<div className={style.homePage}>
			<div className={style.recordBlock}>
				<video ref={ref} className={style.videoBox} />
				<div className={style.controlBtns}>
					<div className={style.controlGroup}>
						<div className={style.controlBtnWrapper}>
							<button
								className={style.controlBtn}
								name="start"
								disabled={!state.startActive}
								onClick={handleStart}
							>
								<RecordStart />
								<span>{state.label}</span>
							</button>
							<label className={style.controlBtnHint}>
								{binds.start}
							</label>
						</div>
						<div className={style.controlBtnWrapper}>
							<button
								className={style.controlBtn}
								name="stop"
								disabled={!state.stopActive}
								onClick={handleStop}
							>
								<RecordStop />
								<span>Stop recording</span>
							</button>
							<label className={style.controlBtnHint}>
								{binds.stop}
							</label>
						</div>
						<div className={style.controlBtnWrapper}>
							<button
								className={style.controlBtn}
								name="sources"
								onClick={getSources}
							>
								<ShareScreen />
								<span>{state.source}</span>
							</button>
						</div>
					</div>
					<div className={style.controlGroup}>
						<div className={style.controlBtnWrapper}>
							<button
								className={style.controlBtn}
								name="info"
								aria-checked={modal.info}
								onClick={handleModalChange}
							>
								<Info />
							</button>
						</div>
						<div className={style.controlBtnWrapper}>
							<button
								className={style.controlBtn}
								name="settings"
								aria-checked={modal.settings}
								onClick={handleModalChange}
							>
								<Settings />
							</button>
						</div>
					</div>
				</div>
			</div>
			{modal.info && (
				<InfoModal
					onClose={() =>
						setModal({
							...modal,
							info: !modal.info,
						})
					}
				/>
			)}
			{modal.settings && (
				<SettingsModal
					onClose={() =>
						setModal({
							...modal,
							settings: !modal.settings,
						})
					}
				/>
			)}
		</div>
	)
}

export default HomePage
