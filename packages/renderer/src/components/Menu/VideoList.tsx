import style from '@/styles/menu.module.scss'
import type { TVideo } from '@/types/Menu'
import { useEffect, useState } from 'react'
import VideoObject from './VideoObject'

const VideoList = () => {
	const [videos, setVideos] = useState<TVideo[]>()
	const [videosPath, setVideosPath] = useState<string>()

	useEffect(() => {
		const getVideos = () => {
			window.ipcRenderer.invoke('get-all-videos').then(res => setVideos(res))
		}
		getVideos()
		window.ipcRenderer.on('all-videos-updated', getVideos)
		window.ipcRenderer.invoke('get-videos-path').then(res => setVideosPath(res))
	}, [])

	const openFolder = () => window.ipcRenderer.send('open-videos-folder')

	return (
		<div className={style.videoList}>
			<h3 className={style.listTabHeader}>
				Your recordings
				<br />
				<small onClick={openFolder}>{videosPath}</small>
			</h3>
			<div className={style.listContent}>
				{videos?.map(video => (
					<VideoObject key={video.filename} video={video} />
				))}
			</div>
		</div>
	)
}

export default VideoList
