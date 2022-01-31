import style from '@/styles/modal.module.scss'
import type * as Type from '@/types/SettingsModal'
import store from '@/utils/electron-store'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'
import Footer from '../Footers/UpdateFooter'
import Modal from './Modal'

const SettingsModal = ({ onClose }: Type.SettingsModalInterface) => {
	const [videoSettings, setVideoSettings] = useState<Type.Video>({
		format: 'webm',
		bitrate: '1080p',
	})
	const [audioSettings, setAudioSettings] = useState<Type.Audio>({
		enabled: false,
		bitrate: '128Kbps',
	})
	const [binds, setBinds] = useState<Type.Binds>({
		start: '',
		stop: '',
	})
	const [warning, setWarning] = useState<string>()

	useEffect(() => {
		const videoPromise = store.get('preferences.video')
		const audioPromise = store.get('preferences.audio')
		const bindsPromise = store.get('preferences.bindings')
		Promise.all([videoPromise, audioPromise, bindsPromise]).then(
			([videoResult, audioResult, bindsResult]) => {
				setVideoSettings({
					format: videoResult.format,
					bitrate: videoResult.bitrate,
				})
				setAudioSettings({
					enabled: audioResult.enabled,
					bitrate: audioResult.bitrate,
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
		const { name } = e.target as HTMLInputElement
		setBinds({
			...binds,
			[name]: `${trusted}+${custom}`,
		})
	}

	const handleAudioChange = () => {
		setAudioSettings({
			...audioSettings,
			enabled: !audioSettings?.enabled,
		})
		store.set('preferences.audio.enabled', !audioSettings?.enabled)
		window.ipcRenderer.send('reset-source')
	}

	const handleVideoBitrateChange = ({ target }: ChangeEvent) => {
		const { value } = target as any
		setVideoSettings({
			...videoSettings,
			bitrate: value,
		})
		store.set('preferences.video.bitrate', +value)
		window.ipcRenderer.send('reset-source')
	}

	const handleAudioBitrateChange = ({ target }: ChangeEvent) => {
		const { value } = target as any
		setAudioSettings({
			...audioSettings,
			bitrate: value,
		})
		store.set('preferences.audio.bitrate', +value)
		window.ipcRenderer.send('reset-source')
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

	return (
		<Modal
			title="Settings"
			isOpen={true}
			onClose={onClose}
			Footer={<Footer />}
		>
			<div className={style.settingsModal}>
				<div className={style.settingsBox}>
					<h2 className={style.settingsTitle}>Video</h2>
					<div className={style.settingsObject}>
						<select
							value={videoSettings?.format.toUpperCase()}
							onChange={() => {
								null
							}}
						>
							<option>WEBM</option>
							<option disabled>MP4</option>
							<option disabled>GIF</option>
							<option disabled>APNG</option>
							<option disabled>WEBP</option>
						</select>
						<span>Video format</span>
					</div>
					<div className={style.settingsObject}>
						<select
							value={videoSettings?.bitrate}
							onChange={handleVideoBitrateChange}
						>
							<option value={41943040}>2160p</option>
							<option value={16777216}>1440p</option>
							<option value={8388608}>1080p</option>
							<option value={5242880}>720p</option>
							<option value={2621440}>480p</option>
							<option value={1048576}>360p</option>
						</select>
						<span>Video bitrate</span>
					</div>
				</div>
				<div className={style.settingsBox}>
					<h2 className={style.settingsTitle}>Audio</h2>
					<div className={style.settingsObject}>
						<input
							type="checkbox"
							checked={audioSettings?.enabled}
							onChange={handleAudioChange}
						/>
						<span>Enable audio</span>
					</div>
					<div className={style.settingsObject}>
						<select
							value={audioSettings.bitrate}
							onChange={handleAudioBitrateChange}
						>
							<option value={128000}>128Kbps</option>
							<option value={64000}>64Kbps</option>
						</select>
						<span>Audio bitrate</span>
					</div>
				</div>
				<div className={style.settingsBox}>
					<h2 className={style.settingsTitle}>Key bindings</h2>
					{warning && (
						<span className={style.settingsWarning}>{warning}</span>
					)}
					<div className={style.settingsObject}>
						<input
							onChange={() => null}
							onKeyDown={handleBindChange}
							onBlur={handleBindSubmit}
							value={binds?.start}
							name="start"
						/>
						<span>Start recording</span>
					</div>
					<div className={style.settingsObject}>
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
