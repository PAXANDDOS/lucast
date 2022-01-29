import style from '@/styles/modal.module.scss'
import store from '@/utils/electron-store'
import type { KeyboardEvent } from 'react'
import { useEffect, useState } from 'react'
import Footer from '../Footers/UpdateFooter'
import Modal from './Modal'

interface SettingsModalInterface {
	onClose: () => void
}

type videoState = {
	format: string
}

type audioState = {
	enabled: boolean
}

type bindsState = {
	start: string
	stop: string
}

const SettingsModal = ({ onClose }: SettingsModalInterface) => {
	const [videoSettings, setVideoSettings] = useState<videoState>()
	const [audioSettings, setAudioSettings] = useState<audioState>({
		enabled: false,
	})
	const [binds, setBinds] = useState<bindsState>({
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
		setBinds({
			...binds,
			// @ts-ignore
			[e.target.name]: `${trusted}+${custom}`,
		})
	}

	const handleAudioChange = () => {
		setAudioSettings({
			enabled: !audioSettings?.enabled,
		})
		store.set('preferences.audio.enabled', !audioSettings?.enabled)
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
					<div className={style.settingsBindObject}>
						<select value={videoSettings?.format.toUpperCase()}>
							<option>WEBM</option>
							<option disabled>MP4</option>
							<option disabled>GIF</option>
							<option disabled>APNG</option>
							<option disabled>WEBP</option>
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
