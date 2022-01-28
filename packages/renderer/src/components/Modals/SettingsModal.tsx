import { Update } from '@/assets/icons/Misc'
import style from '@/styles/modal.module.scss'
import store from '@/utils/electron-store'
import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import Modal from './Modal'

interface SettingsModalInterface {
	onClose: () => void
}

interface osInfoInterface {
	version: string
	arch: string
	release: string
}

interface bindsInterface {
	start: string
	stop: string
}

const SettingsModal = ({ onClose }: SettingsModalInterface) => {
	const [osInfo, setOsInfo] = useState<osInfoInterface>()
	const [binds, setBinds] = useState<bindsInterface>()
	const [needRestart, setNeedRestart] = useState<boolean>(false)
	const updateRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		window.ipcRenderer.invoke('get-os-info').then((res) => setOsInfo(res))

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
	}, [])

	const handleChange = (e: KeyboardEvent) => {
		console.log(e)
		let trusted = null

		if (e.ctrlKey) trusted = 'CmdOrCtrl'
		else if (e.altKey) trusted = 'Alt'
		else return

		const custom = e.key
		// @ts-ignore
		setBinds({
			...binds,
			// @ts-ignore
			[e.target.name]: `${trusted}+${custom}`,
		})
	}

	const handleSubmit = async () => {
		const startInitial = await store.get('startRecord')
		const stopInitial = await store.get('stopRecord')
		if (startInitial !== binds?.start)
			await store.set('startRecord', binds?.start)
		if (stopInitial !== binds?.stop)
			await store.set('stopRecord', binds?.stop)

		setNeedRestart(true)
	}

	const checkUpdates = () => {
		if (
			!updateRef.current ||
			updateRef.current.className === style.spinAnimation
		)
			return
		updateRef.current.className = style.spinAnimation
	}

	const Footer = (
		<div className={style.modalFooterSettings}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>Preview v1.2.2</span>
				<span>
					{osInfo?.version} {osInfo?.arch} ({osInfo?.release})
				</span>
			</div>
			<button className={style.checkForUpdatesBtn} onClick={checkUpdates}>
				<div ref={updateRef}>
					<Update />
				</div>
				<span>Check for update</span>
			</button>
		</div>
	)

	return (
		<Modal title="Settings" isOpen={true} onClose={onClose} Footer={Footer}>
			<div className={style.settingsModal}>
				<div className={style.settingsBox}>
					<h2 className={style.settingsTitle}>Video</h2>
					<div className={style.settingsBindObject}>
						<select>
							<option>WEBM</option>
							<option>MP4</option>
							<option>AVI</option>
						</select>
						<span>Video format</span>
					</div>
				</div>
				<div className={style.settingsBox}>
					<h2 className={style.settingsTitle}>Audio</h2>
					<div className={style.settingsBindObject}>
						<input type="checkbox" />
						<span>Enable audio</span>
					</div>
				</div>
				<div className={style.settingsBox}>
					<h2 className={style.settingsTitle}>Key bindings</h2>
					{needRestart && (
						<span className={style.restartWarning}>
							Restart program for the changes to take effect!
						</span>
					)}
					<div className={style.settingsBindObject}>
						<input
							onKeyDown={handleChange}
							onBlur={handleSubmit}
							value={binds?.start}
							name="start"
						/>
						<span>Start recording</span>
					</div>
					<div className={style.settingsBindObject}>
						<input
							onKeyDown={handleChange}
							onBlur={handleSubmit}
							value={binds?.stop}
							name="stop"
						/>
						<span>Stop recording</span>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default SettingsModal
