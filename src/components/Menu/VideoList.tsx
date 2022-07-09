import { useEffect, useState } from 'react'

import type { Video } from '#/typings/Video'
import style from 'styles/menu.module.scss'
import { VideoObject } from './VideoObject'

const videosPath = window.api.invokeSync('get-videos-path')

export const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>()

    useEffect(() => {
        const getVideos = () => {
            window.api.invoke('get-all-videos').then(res => setVideos(res))
        }
        getVideos()
        window.api.on('all-videos-updated', getVideos)
    }, [])

    return (
        <div className={style.videoList}>
            <h3 className={style.listTabHeader}>
                Your recordings
                <br />
                <small onClick={() => window.api.send('open-videos-folder')}>{videosPath}</small>
            </h3>
            <div className={style.listContent}>
                {videos?.map(video => (
                    <VideoObject key={video.filename} video={video} />
                ))}
            </div>
        </div>
    )
}
