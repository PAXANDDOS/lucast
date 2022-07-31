import { formatDuration } from '#/lib/formatDuration'
import style from './videoItem.module.scss'

export const VideoItem: React.FC<{ video: Video }> = ({ video }) => {
    const handleClick: React.MouseEventHandler = ({ type }) => {
        if (type === 'click') window.api.send('open-video', video.format.filename)
        else if (type === 'contextmenu') window.api.send('show-video-context', video)
    }

    return (
        <div className={style.item} onClick={handleClick} onContextMenu={handleClick}>
            <img className={style.preview} src="/thumbnail.svg" />
            <div className={style.info}>
                <h4 className={style.name}>{video.filename}</h4>
                <div className={style.tags}>
                    <span className={style.tag}>{video.video.height}p</span>
                    <span className={style.tag}>{video.video.r_frame_rate?.split('/')[0]}FPS</span>
                </div>
                <span className={style.length}>{formatDuration(video.format.duration!)}</span>
            </div>
        </div>
    )
}
