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

interface videoInterface {
	format: string
}

interface audioInterface {
	enabled: boolean
}

interface bindsInterface {
	start: string
	stop: string
}

const SettingsModal = ({ onClose }: SettingsModalInterface) => {
	const [osInfo, setOsInfo] = useState<osInfoInterface>()
	const [videoSettings, setVideoSettings] = useState<videoInterface>()
	const [audioSettings, setAudioSettings] = useState<audioInterface>({
		enabled: false,
	})
	const [binds, setBinds] = useState<bindsInterface>({
		start: '',
		stop: '',
	})
	const [warning, setWarning] = useState<string>()
	const updateRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		window.ipcRenderer.invoke('get-os-info').then((res) => setOsInfo(res))

		const videoPromise = store.get('preferences.video')
		const audioPromise = store.get('preferences.audio')
		const bindsPromise = store.get('preferences.bindings')
		Promise.all([videoPromise, audioPromise, bindsPromise]).then(
			([videoResult, audioResult, bindsResult]) => {
				setVideoSettings({
					format: videoResult.format,
				})
				setAudioSettings({
					enabled: audioResult.enabled,
				})
				setBinds({
					start: bindsResult.start,
					stop: bindsResult.stop,
				})
			}
		)
	}, [])

	const handleBindChange = (e: KeyboardEvent) => {
		let trusted = null

		if (e.ctrlKey) trusted = 'CmdOrCtrl'
		else if (e.altKey) trusted = 'Alt'
		else
			return setWarning(
				'Key combination should start with Control or Alt!'
			)

		switch (e.key) {
			case 'Alt':
			case 'Control':
			case 'Shift':
				return
		}
		const custom = e.key
		// @ts-ignore
		setBinds({
			...binds,
			// @ts-ignore
			[e.target.name]: `${trusted}+${custom}`,
		})
	}

	const handleAudioChange = async () => {
		await store.set('preferences.audio.enabled', !audioSettings?.enabled)
		setAudioSettings({
			enabled: !audioSettings?.enabled,
		})
	}

	const handleBindSubmit = async () => {
		if (binds?.start === binds?.stop)
			return setWarning('Key combination should not be the same!')

		const bindsInitial = await store.get('preferences.bindings')
		let changed = false
		if (bindsInitial.start !== binds?.start) {
			await store.set('preferences.bindings.start', binds?.start)
			changed = true
		}
		if (bindsInitial.stop !== binds?.stop) {
			await store.set('preferences.bindings.stop', binds?.stop)
			changed = true
		}

		changed && setWarning('Restart program for the changes to take effect!')
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
						<select value={videoSettings?.format.toUpperCase()}>
							<option>WEBM</option>
							<option disabled>MP4</option>
						</select>
						<span>Video format</span>
					</div>
				</div>
				<div className={style.settingsBox}>
					<h2 className={style.settingsTitle}>Audio</h2>
					<div className={style.settingsBindObject}>
						<input
							type="checkbox"
							checked={audioSettings?.enabled}
							onChange={handleAudioChange}
						/>
						<span>Enable audio</span>
					</div>
				</div>
				<div className={style.settingsBox}>
					<h2 className={style.settingsTitle}>Key bindings</h2>
					{warning && (
						<span className={style.settingsWarning}>{warning}</span>
					)}
					<div className={style.settingsBindObject}>
						<input
							onChange={() => null}
							onKeyDown={handleBindChange}
							onBlur={handleBindSubmit}
							value={binds?.start}
							name="start"
						/>
						<span>Start recording</span>
					</div>
					<div className={style.settingsBindObject}>
						<input
							onChange={() => null}
							onKeyDown={handleBindChange}
							onBlur={handleBindSubmit}
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
