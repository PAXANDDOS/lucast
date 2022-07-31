import { useEffect, useState } from 'react'

import { formatBytes } from '#/lib/formatBytes'
import { useModal } from '#/modules/Modal'
import { VideoItem } from '@/Menu/VideoItem'
import { Info, Settings } from 'icons/Misc'

import style from './menu.module.scss'

const videosPath = window.api.invokeSync('get-videos-path')
const diskRawInfo = window.api.invokeSync('get-disk-info')
const diskInfo = {
    free: formatBytes(diskRawInfo.free),
    size: formatBytes(diskRawInfo.size),
}

export const Menu: React.FC = () => {
    const { showModal } = useModal()
    const [videos, setVideos] = useState<Video[]>()

    useEffect(() => {
        const getVideos = () => {
            window.api.invoke('get-all-videos').then(res => setVideos(res))
        }
        getVideos()
        window.api.on('all-videos-updated', getVideos)
    }, [])

    return (
        <div className={style.menu}>
            <div className={style.list}>
                <h3 className={style.head}>
                    Your recordings
                    <br />
                    <small onClick={() => window.api.send('open-videos-folder')}>
                        {videosPath}
                    </small>
                </h3>
                <div className={style.content}>
                    {videos?.map(video => (
                        <VideoItem key={video.filename} video={video} />
                    ))}
                </div>
            </div>
            <div className={style.bar}>
                <span className={style.disk}>
                    {diskInfo.free} free of {diskInfo.size}
                </span>
                <button className={style.button} name="info" onClick={() => showModal('Info')}>
                    <Info width={20} />
                </button>
                <button
                    className={style.button}
                    name="settings"
                    onClick={() => showModal('Settings')}
                >
                    <Settings width={20} />
                </button>
            </div>
        </div>
    )
}
