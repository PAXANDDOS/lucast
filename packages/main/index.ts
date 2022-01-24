import { app, BrowserWindow } from 'electron'
import os from 'os'
import { join } from 'path'
import './samples/electron-store'

const isDev = import.meta.env.MODE === 'development'

const isWin7 = os.release().startsWith('6.1')
if (isWin7) app.disableHardwareAcceleration()

if (!app.requestSingleInstanceLock()) {
	app.quit()
	process.exit(0)
}

let window: BrowserWindow | null = null

const createWindow = async () => {
	window = new BrowserWindow({
		title: 'Screencast',
		show: false,
		webPreferences: {
			webviewTag: false,
			nativeWindowOpen: true,
			nodeIntegration: true,
			contextIsolation: false,
			preload: join(__dirname, '../preload/index.cjs'),
		},
	})

	window.on('ready-to-show', () => {
		window?.show()
		isDev && window?.webContents.openDevTools()
	})

	if (app.isPackaged) {
		window.loadFile(join(__dirname, '../renderer/index.html'))
	} else {
		const pkg = await import('../../package.json')
		const url = `http://${pkg.env.HOST || '127.0.0.1'}:${pkg.env.PORT}`

		window.loadURL(url)
	}

	window.webContents.on('did-finish-load', () => {
		window?.webContents.send(
			'main-process-message',
			new Date().toLocaleString()
		)
	})
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	window = null
	if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
	if (window) {
		if (window.isMinimized()) window.restore()
		window.focus()
	}
})

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows()
	if (allWindows.length) allWindows[0].focus()
	else createWindow()
})
