import type { Video } from '#/typings/Video'

import { formatDuration } from '#/utils/format-duration'
import style from 'styles/menu.module.scss'

export const VideoObject: React.FC<{ video: Video }> = ({ video }) => {
    const handleClick: React.MouseEventHandler = ({ type }) => {
        if (type === 'click') window.api.send('open-video', video.format.filename)
        else if (type === 'contextmenu') window.api.send('show-video-context', video)
    }

    return (
        <div className={style.videoObject} onClick={handleClick} onContextMenu={handleClick}>
            <img src="/thumbnail.svg" />
            <div className={style.videoObjectInfo}>
                <h4>{video.filename}</h4>
                <div className={style.videoObjectTags}>
                    <span className={style.videoObjectTag}>{video.video.height}p</span>
                    <span className={style.videoObjectTag}>
                        {video.video.r_frame_rate?.split('/')[0]}FPS
                    </span>
                </div>
                <span className={style.videoObjectLength}>
                    {formatDuration(video.format.duration!)}
                </span>
            </div>
        </div>
    )
}
