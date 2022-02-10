import { Loading } from '@/assets/icons/Misc'
import style from '@/styles/toast.module.scss'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ToastElement = () => {
	const [progress, setProgress] = useState<number>(0)
	useEffect(() => {
		window.ipcRenderer.on('video-process-progress', (event, progress: number) => {
			setProgress(progress)
		})
		return () => {
			window.ipcRenderer.removeAllListeners('video-process-progress')
		}
	}, [])

	return (
		<div className={style.toastElement}>
			<div>
				<Loading />
				<span>Processing video...</span>
			</div>
			<span>{progress}%</span>
		</div>
	)
}

const Toast = () => {
	const [rendered, setRendered] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const handleEnd = () => {
		if (!ref.current) return
		ref.current.className = `${style.toast} ${style.popDownAnimation}`
		ref.current.onanimationend = () => setRendered(false)
	}

	useEffect(() => {
		window.ipcRenderer.on('video-process-started', () => setRendered(true))
		window.ipcRenderer.on('video-process-ended', handleEnd)
		return () => {
			window.ipcRenderer.removeAllListeners('video-process-started')
			window.ipcRenderer.removeAllListeners('video-process-ended')
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return createPortal(
		rendered && (
			<div className={style.toastContainer}>
				<div className={style.toast} ref={ref}>
					<ToastElement />
				</div>
			</div>
		),
		document.querySelector('#root') as Element
	)
}

export default Toast
