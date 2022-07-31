import { useEffect, useState } from 'react'

import store from '#/lib/store'
import { Modal } from '#/modules/Modal'

import { UpdateFooter } from '@/Footers/UpdateFooter'
import style from 'styles/modal.module.scss'

export const SettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [videoSettings, setVideoSettings] = useState<Video>({
        format: 'mp4',
        quality: 1080,
        bitrate: 8388608,
        fps: 30,
    })
    const [audioSettings, setAudioSettings] = useState<Audio>({
        enabled: false,
        bitrate: 128000,
        volume: 1.0,
    })
    const [binds, setBinds] = useState<Binds>({
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
                    quality: +videoResult.quality,
                    bitrate: +videoResult.bitrate,
                    fps: +videoResult.fps,
                })
                setAudioSettings({
                    enabled: audioResult.enabled,
                    bitrate: +audioResult.bitrate,
                    volume: +audioResult.volume,
                })
                setBinds({
                    start: bindsResult.start,
                    stop: bindsResult.stop,
                })
            }
        )
    }, [])

    const handleBindChange: React.KeyboardEventHandler<HTMLInputElement> = e => {
        let trusted = null

        if (e.ctrlKey) trusted = 'CmdOrCtrl'
        else if (e.altKey) trusted = 'Alt'
        else return setWarning('Key combination should start with Control or Alt!')

        switch (e.key) {
            case 'Alt':
            case 'Control':
            case 'Shift':
                return
        }
        const custom = e.key

        setBinds({
            ...binds,
            [e.currentTarget.name]: `${trusted}+${custom}`,
        })
    }

    const handleVideoFormatChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
        setVideoSettings({
            ...videoSettings,
            format: target.value,
        })

        store.set('preferences.video.format', target.value)
        window.api.send('reset-source')
    }

    const handleVideoQualityChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
        setVideoSettings({
            ...videoSettings,
            quality: +target.value,
        })

        store.set('preferences.video.quality', +target.value)
        window.api.send('reset-source')
    }

    const handleVideoBitrateChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
        setVideoSettings({
            ...videoSettings,
            bitrate: +target.value,
        })

        store.set('preferences.video.bitrate', +target.value)
        window.api.send('reset-source')
    }

    const handleVideoFrameChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
        setVideoSettings({
            ...videoSettings,
            fps: +target.value,
        })

        store.set('preferences.video.fps', +target.value)
        window.api.send('reset-source')
    }

    const handleAudioChange: React.ChangeEventHandler = () => {
        setAudioSettings({
            ...audioSettings,
            enabled: !audioSettings?.enabled,
        })

        store.set('preferences.audio.enabled', !audioSettings?.enabled)
        window.api.send('reset-source')
    }

    const handleAudioBitrateChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
        setAudioSettings({
            ...audioSettings,
            bitrate: +target.value,
        })

        store.set('preferences.audio.bitrate', +target.value)
        window.api.send('reset-source')
    }

    const handleAudioVolumeChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const volume = +target.value / 100

        setAudioSettings({
            ...audioSettings,
            volume: volume,
        })

        store.set('preferences.audio.volume', volume)
        window.api.send('reset-source')
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
        <Modal title="Settings" isOpen={true} onClose={onClose} Footer={<UpdateFooter />}>
            <div className={style.settingsModal}>
                <div className={style.settingsBox}>
                    <h2 className={style.settingsTitle}>Video</h2>
                    <div className={style.settingsObject}>
                        <select value={videoSettings?.format} onChange={handleVideoFormatChange}>
                            <option value="mp4">MP4</option>
                            <option value="avi">AVI</option>
                            <option value="mov">MOV</option>
                            <option value="flv">FLV</option>
                            <option value="webm">WEBM</option>
                            <option value="gif">GIF</option>
                        </select>
                        <span>Video format</span>
                    </div>
                    <div className={style.settingsObject}>
                        <select value={videoSettings?.quality} onChange={handleVideoQualityChange}>
                            <option value={0}>Native</option>
                            <option value={2160}>2160p</option>
                            <option value={1440}>1440p</option>
                            <option value={1080}>1080p</option>
                            <option value={720}>720p</option>
                            <option value={480}>480p</option>
                            <option value={360}>360p</option>
                        </select>
                        <span>Video quality</span>
                    </div>
                    <div className={style.settingsObject}>
                        <select value={videoSettings?.bitrate} onChange={handleVideoBitrateChange}>
                            <option value={41943040}>40Mbps</option>
                            <option value={16777216}>16Mbps</option>
                            <option value={8388608}>8Mbps</option>
                            <option value={5242880}>5Mbps</option>
                            <option value={2621440}>2.5Mbps</option>
                            <option value={1048576}>1Mbps</option>
                        </select>
                        <span>Video bitrate</span>
                    </div>
                    <div className={style.settingsObject}>
                        <select value={videoSettings?.fps} onChange={handleVideoFrameChange}>
                            <option value={60}>60FPS</option>
                            <option value={30}>30FPS</option>
                            <option value={24}>24FPS</option>
                            <option value={16}>16FPS</option>
                        </select>
                        <span>Video framerate</span>
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
                        <select value={audioSettings.bitrate} onChange={handleAudioBitrateChange}>
                            <option value={128000}>128Kbps</option>
                            <option value={64000}>64Kbps</option>
                        </select>
                        <span>Audio bitrate</span>
                    </div>
                    <div className={style.settingsObject}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={Math.round(audioSettings.volume * 100)}
                            onChange={handleAudioVolumeChange}
                        />
                        <span>Volume: {Math.round(audioSettings.volume * 100)}</span>
                    </div>
                </div>
                <div className={style.settingsBox}>
                    <h2 className={style.settingsTitle}>Key bindings</h2>
                    {warning && <span className={style.settingsWarning}>{warning}</span>}
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

type Video = {
    format: string
    quality: number
    bitrate: number
    fps: number
}

type Audio = {
    enabled: boolean
    bitrate: number
    volume: number
}

type Binds = {
    start: string
    stop: string
}
