import { Cross, Maximize, MaximizeRestore, Minimize } from '@/assets/icons/Misc'
import style from '@/styles/titleBar.module.scss'
import type { TOs } from '@/types/Footer'
import { useEffect, useState } from 'react'

const TitleBar = () => {
	const [isDarwin, setIsDarwin] = useState(false)
	const [maximized, setMaximized] = useState(<Maximize />)
	const handleMinimize = () => window.ipcRenderer.send('app-minimize')
	const handleMaximize = () => window.ipcRenderer.send('app-maximize')
	const handleClose = () => window.ipcRenderer.send('app-close')

	useEffect(() => {
		window.ipcRenderer.on('isMaximized', () => setMaximized(<MaximizeRestore />))
		window.ipcRenderer.on('isRestored', () => setMaximized(<Maximize />))
		window.ipcRenderer.invoke('get-os-info').then((res: TOs) => {
			if (res.os === 'macOS') setIsDarwin(true)
		})
	}, [])

	return (
		<nav
			className={style.titleBar}
			style={{
				justifyContent: isDarwin ? 'center' : 'space-between',
			}}
		>
			<div className={style.titleBox}>
				<h4>Lucast</h4>
			</div>
			{isDarwin || (
				<div className={style.systemBox}>
					<div data-type="min" onClick={handleMinimize} className={style.systemBoxProp}>
						<Minimize />
					</div>
					<div data-type="max" onClick={handleMaximize} className={style.systemBoxProp}>
						{maximized}
					</div>
					<div data-type="close" onClick={handleClose} className={style.systemBoxProp}>
						<Cross />
					</div>
				</div>
			)}
		</nav>
	)
}

export default TitleBar
