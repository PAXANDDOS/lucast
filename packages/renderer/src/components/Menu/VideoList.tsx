import style from '@/styles/menu.module.scss'
import VideoObject from './VideoObject'

const VideoList = () => {
	return (
		<div className={style.videoList}>
			<h3 className={style.listTabHeader}>
				Your recordings
				<br />
				<small>C:\Users\Litov\Videos\Lucast</small>
			</h3>
			<VideoObject />
			<VideoObject />
			<VideoObject />
		</div>
	)
}

export default VideoList
