import InfoModal from '@/components/Modals/InfoModal'
import SettingsModal from '@/components/Modals/SettingsModal'
import style from '@/styles/home.module.scss'
import store from '@/utils/electron-store'
import type { DesktopCapturerSource } from 'electron'
import type * as Type from 'packages/renderer/types/HomePage'
import type { MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { webmFixDuration } from 'webm-fix-duration'
import {
	Info,
	RecordStart,
	RecordStop,
	Settings,
	ShareScreen,
} from '../assets/icons/Misc'

const HomePage = () => {
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>()
	const [state, setState] = useState<Type.State>({
		label: 'Start recording',
		source: 'Select source',
		startActive: false,
		stopActive: false,
	})
	const [modal, setModal] = useState<Type.ModalState>({
		info: false,
		settings: false,
	})
	const [binds, setBinds] = useState<Type.BindsState>({
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
	}

	const handleDataAvailable = (e: BlobEvent) => recordedChunks.push(e.data)

	const handleStart = () => {
		mediaRecorder?.start()
		store.set('temp.start', Date.now())
		setState({
			...state,
			label: 'Recording...',
			startActive: false,
			stopActive: true,
		})
	}

	const handleStop = () => {
		mediaRecorder?.stop()
		setState({
			...state,
			label: 'Start recording',
			startActive: true,
			stopActive: false,
		})
	}

	const handleModalChange = ({ currentTarget }: MouseEvent) => {
		const element = currentTarget as HTMLButtonElement
		setModal({
			...modal,
			[element.name]: !(element.ariaChecked === 'true' && true),
		})
	}

	useEffect(() => {
		window.ipcRenderer.on('start-recording', () => {
			if (state.startActive) {
				handleStart()
				new Notification('Recording has started')
			}
		})
		return () => {
			window.ipcRenderer.removeAllListeners('start-recording')
		}
	})

	useEffect(() => {
		window.ipcRenderer.on('stop-recording', () => {
			if (state.stopActive) {
				handleStop()
				new Notification('Recording stopped')
			}
		})
		return () => {
			window.ipcRenderer.removeAllListeners('stop-recording')
		}
	})

	useEffect(() => {
		window.ipcRenderer.on(
			'input-source-selected',
			async (e, source: DesktopCapturerSource) => {
				if (!ref.current) return

				const mediaDevices = navigator.mediaDevices as any
				const audioEnabled: boolean = await store.get(
					'preferences.audio.enabled'
				)
				const mandatory = {
					mandatory: {
						chromeMediaSource: 'desktop',
						chromeMediaSourceId: source.id,
					},
				}
				const stream = await mediaDevices.getUserMedia({
					audio: audioEnabled ? mandatory : false,
					video: mandatory,
				})

				ref.current.srcObject = stream
				ref.current.muted = true
				ref.current.play()

				const newMediaRecorder = new MediaRecorder(stream, {
					mimeType: `video/webm; codecs=vp9${
						audioEnabled ? ', opus' : ''
					}`,
					audioBitsPerSecond: 128000,
					videoBitsPerSecond: 8000000,
				})
				newMediaRecorder.ondataavailable = handleDataAvailable
				newMediaRecorder.onstop = async () => {
					const blob = new Blob(recordedChunks, {
						type: `video/webm; codecs=vp9${
							audioEnabled && ', opus'
						}`,
					})
					const duration =
						Date.now() - (await store.get('temp.start'))
					const fixedBlob = await webmFixDuration(blob, duration)
					window.ipcRenderer.send(
						'save-blob',
						await fixedBlob.arrayBuffer()
					)
					recordedChunks.length = 0
				}

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
		return () => {
			window.ipcRenderer.removeAllListeners('input-source-selected')
		}
	})

	useEffect(() => {
		store.get('preferences.bindings').then((binds) =>
			setBinds({
				start: binds.start,
				stop: binds.stop,
			})
		)
	}, [])

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
