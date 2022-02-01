import style from '@/styles/menu.module.scss'

const VideoObject = () => {
	return (
		<div className={style.videoObject}>
			<img src="/img/Cover.png" />
			<div className={style.videoObjectInfo}>
				<h4>Video #3</h4>
				<div className={style.videoObjectTags}>
					<span className={style.videoObjectTag}>1080p</span>
					<span className={style.videoObjectTag}>30FPS</span>
				</div>
				<span className={style.videoObjectLength}>13:27</span>
			</div>
		</div>
	)
}

export default VideoObject
