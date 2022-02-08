import style from '@/styles/menu.module.scss'
import type { IVideoProps } from '@/types/Menu'
import formatDuration from '@/utils/format-duration'
import type { MouseEvent } from 'react'
import thumbnail from '/img/thumbnail.png'

const VideoObject = ({ video }: IVideoProps) => {
	const handleClick = ({ type }: MouseEvent) => {
		if (type === 'click') window.ipcRenderer.send('open-video', video.format.filename)
		else if (type === 'contextmenu') window.ipcRenderer.send('show-video-context', video)
	}

	return (
		<div className={style.videoObject} onClick={handleClick} onContextMenu={handleClick}>
			<img src={thumbnail} />
			<div className={style.videoObjectInfo}>
				<h4>{video.filename}</h4>
				<div className={style.videoObjectTags}>
					<span className={style.videoObjectTag}>{video.video.height}p</span>
					<span className={style.videoObjectTag}>
						{video.video.r_frame_rate?.split('/')[0]}FPS
					</span>
				</div>
				<span className={style.videoObjectLength}>
					{formatDuration(video.format.duration)}
				</span>
			</div>
		</div>
	)
}

export default VideoObject
