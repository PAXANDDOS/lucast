import { Logo } from '@/assets/icons/Brand'
import style from '@/styles/modal.module.scss'
import type { Progress } from '@/types/UpdateModal'
import store from '@/utils/electron-store'
import formatBytes from '@/utils/format-bytes'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ProgressBar from '../ProgressBar'

const UpdateModal = () => {
	const [progress, setProgress] = useState<Progress>({
		current: 'Initializing...',
		bytes: '0 Bytes',
		total: '',
	})
	const containerRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const init = async () => {
			const url = await store.get('update.path')
			const directory = await window.ipcRenderer.invoke(
				'get-app-path',
				'temp'
			)
			window.ipcRenderer.send('download-file', {
				url,
				properties: { directory },
			})
		}
		window.ipcRenderer.on('download-progress', (event, status) => {
			setProgress({
				current: `${Math.floor(status.percent * 100)}%`,
				bytes: formatBytes(status.transferredBytes),
				total: progress?.total
					? progress?.total
					: formatBytes(status.totalBytes),
			})
		})
		window.ipcRenderer.on('download-completed', (event, status) => {
			store.set('update.available', false)
			const size = formatBytes(status.fileSize)
			setProgress({
				current: 'Installing...',
				bytes: size,
				total: size,
			})
		})
		init()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return createPortal(
		<div
			className={style.modalContainer}
			ref={containerRef}
			style={{
				background: 'rgb(44, 47, 51)',
				height: '100%',
			}}
		>
			<button
				className={style.modalOverlay}
				style={{ opacity: 0.4, height: '100%', cursor: 'default' }}
			/>
			<div className={style.modalContent} ref={contentRef}>
				<div className={style.modalBody}>
					<div className={style.updateModal}>
						<div className={style.updateLogoBox}>
							<Logo />
						</div>
						<div className={style.updateDataBox}>
							<h1>{progress?.current}</h1>
							<ProgressBar
								current={progress?.current.slice(0, -1)}
							/>
							<span>
								Downloaded {progress?.bytes} of{' '}
								{progress?.total}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('root') as Element
	)
}

export default UpdateModal
