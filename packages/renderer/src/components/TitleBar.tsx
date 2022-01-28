import { Cross, Maximize, MaximizeRestore, Minimize } from '@/assets/icons/Misc'
import style from '@/styles/titleBar.module.scss'
import { useEffect, useState } from 'react'

const TitleBar = () => {
	const [maximized, setMaximized] = useState(<Maximize />)
	const handleMinimize = () => window.ipcRenderer.send('app-minimize')
	const handleMaximize = () => window.ipcRenderer.send('app-maximize')
	const handleClose = () => window.ipcRenderer.send('app-close')

	useEffect(() => {
		window.ipcRenderer.on('isMaximized', () =>
			setMaximized(<MaximizeRestore />)
		)
		window.ipcRenderer.on('isRestored', () => setMaximized(<Maximize />))
	}, [])

	return (
		<nav className={style.titleBar}>
			<div className={style.titleBox}>
				<h4>Lucast</h4>
			</div>
			<div className={style.systemBox}>
				<div
					data-type="min"
					onClick={handleMinimize}
					className={style.systemBoxProp}
				>
					<Minimize />
				</div>
				<div
					data-type="max"
					onClick={handleMaximize}
					className={style.systemBoxProp}
				>
					{maximized}
				</div>
				<div
					data-type="close"
					onClick={handleClose}
					className={style.systemBoxProp}
				>
					<Cross />
				</div>
			</div>
		</nav>
	)
}

export default TitleBar
