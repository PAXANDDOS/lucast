import { Hide, RecordStart, RecordStop, ShareScreen } from '@/assets/icons/Misc'
import style from '@/styles/recorder.module.scss'
import type { TBinds, TState } from '@/types/Recorder'
import store from '@/utils/electron-store'
import type { DesktopCapturerSource } from 'electron'
import { useEffect, useRef, useState } from 'react'

const Recorder = () => {
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
	const [state, setState] = useState<TState>({
		label: 'Start recording',
		source: 'Source',
		startActive: false,
		stopActive: false,
	})
	const [binds, setBinds] = useState<TBinds>({
		start: 'No bind',
		stop: 'No bind',
	})
	const ref = useRef<HTMLVideoElement>(null)
	const recordedChunks: Blob[] = []

	const getSources = async () => {
		const sources = await window.ipcRenderer.invoke('get-input-sources', ['screen', 'window'])
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

	const hidePreview = () => {
		return
	}

	useEffect(() => {
		window.ipcRenderer.on('start-recording', () => {
			if (state.startActive) {
				handleStart()
				window.ipcRenderer.send('show-notification', {
					title: 'Recording has started',
				})
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
				window.ipcRenderer.send('show-notification', {
					title: 'Recording stopped',
				})
			}
		})
		return () => {
			window.ipcRenderer.removeAllListeners('stop-recording')
		}
	})

	useEffect(() => {
		window.ipcRenderer.on('input-source-selected', async (e, source: DesktopCapturerSource) => {
			if (!ref.current) return

			if (!source) {
				ref.current.srcObject = null
				setState({
					label: 'Start recording',
					startActive: false,
					stopActive: false,
					source: 'Source',
				})
				setMediaRecorder(null)
				return
			}

			const mediaDevices = navigator.mediaDevices as any
			const videoSettings = await store.get('preferences.video')
			const audioSettings = await store.get('preferences.audio')
			const constraints = {
				mandatory: {
					chromeMediaSource: 'desktop',
					chromeMediaSourceId: source.id,
				},
			}
			const stream = await mediaDevices.getUserMedia({
				audio: audioSettings.enabled ? constraints : false,
				video: constraints,
			})

			ref.current.srcObject = stream
			ref.current.muted = true
			ref.current.play()

			const newMediaRecorder = new MediaRecorder(stream, {
				mimeType: `video/webm; codecs=vp9${audioSettings.enabled ? ', opus' : ''}`,
				audioBitsPerSecond: audioSettings.bitrate,
				videoBitsPerSecond: videoSettings.bitrate,
			})
			newMediaRecorder.ondataavailable = handleDataAvailable
			newMediaRecorder.onstop = async () => {
				const blob = new Blob(recordedChunks, {
					type: `video/webm; codecs=vp9${audioSettings.enabled && ', opus'}`,
				})
				window.ipcRenderer.send('save-blob', {
					blob: await blob.arrayBuffer(),
					duration: Date.now() - (await store.get('temp.start')),
					video: videoSettings,
					audio: audioSettings,
				})
				recordedChunks.length = 0
			}

			setMediaRecorder(newMediaRecorder)
			setState({
				...state,
				startActive: true,
				source: source.name.length > 13 ? `${source.name.slice(0, 11)}..` : source.name,
			})
		})
		return () => {
			window.ipcRenderer.removeAllListeners('input-source-selected')
		}
	})

	useEffect(() => {
		store.get('preferences.bindings').then(binds =>
			setBinds({
				start: binds.start,
				stop: binds.stop,
			})
		)
	}, [])

	return (
		<div className={style.recordBlock}>
			<div className={style.videoBox}>
				<video ref={ref} />
			</div>
			<div className={style.controlBox}>
				<div className={style.controlGroup}>
					<button
						className={style.controlBtn}
						name="start"
						title="Start recording"
						disabled={!state.startActive}
						onClick={handleStart}
					>
						<div>
							<RecordStart />
							<span>{state.label}</span>
						</div>
						<label>{binds.start}</label>
					</button>
					<button
						className={style.controlBtn}
						name="stop"
						title="Stop recording"
						disabled={!state.stopActive}
						onClick={handleStop}
					>
						<div>
							<RecordStop />
							<span>Stop recording</span>
						</div>
						<label>{binds.stop}</label>
					</button>
					<button
						className={style.controlBtn}
						name="sources"
						title="Select source"
						onClick={getSources}
					>
						<div>
							<ShareScreen />
							<span>{state.source}</span>
						</div>
					</button>
					<button
						className={style.controlBtn}
						name="hide"
						title="Hide preview"
						onClick={hidePreview}
					>
						<div>
							<Hide />
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Recorder
