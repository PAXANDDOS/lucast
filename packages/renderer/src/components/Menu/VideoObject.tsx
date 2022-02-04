import style from '@/styles/menu.module.scss'
import type { IVideoProps } from '@/types/Menu'
import formatDuration from '@/utils/format-duration'
import thumbnail from '/img/thumbnail.png'

const VideoObject = ({ video }: IVideoProps) => {
	const openVideo = () =>
		window.ipcRenderer.send('open-video', video.format.filename)
	return (
		<div className={style.videoObject} onClick={openVideo}>
			<img src={thumbnail} />
			<div className={style.videoObjectInfo}>
				<h4>{video.filename}</h4>
				<div className={style.videoObjectTags}>
					<span className={style.videoObjectTag}>
						{video.video.height}p
					</span>
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
