import { app, BrowserWindow, globalShortcut, ipcMain, shell } from 'electron'
import Store from 'electron-store'
import { release } from 'os'
import { join } from 'path'
import './samples/download-file'
import './samples/input-sources'
import './samples/sys-info'
import './samples/video-handler'

const isDev = import.meta.env.NODE_ENV === 'development'

if (release().startsWith('6.1')) app.disableHardwareAcceleration()

if (!app.requestSingleInstanceLock()) {
	app.quit()
	process.exit(0)
}

let win: BrowserWindow | null = null
app.commandLine.appendSwitch('enable-webgl')

const createWindow = async () => {
	win = new BrowserWindow({
		title: 'Lucast',
		width: 1420,
		height: 720,
		minWidth: 1040,
		minHeight: 560,
		show: false,
		icon: join(__dirname, '../../build/icon.ico'),
		autoHideMenuBar: true,
		titleBarStyle: 'hidden',
		webPreferences: {
			webviewTag: false,
			nativeWindowOpen: true,
			nodeIntegration: false,
			contextIsolation: true,
			preload: join(__dirname, '../preload/index.cjs'),
		},
	})

	win.on('ready-to-show', () => {
		win?.show()
		isDev && win?.webContents.openDevTools()
	})

	if (app.isPackaged) {
		win.loadFile(join(__dirname, '../renderer/index.html'))
	} else {
		const pkg = await import('../../package.json')
		const url = `http://${pkg.env.HOST || '127.0.0.1'}:${pkg.env.PORT}`

		win.loadURL(url)
	}

	win.webContents.on('did-finish-load', () => {
		win?.webContents.send(
			'main-process-message',
			new Date().toLocaleString()
		)
	})

	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('https:')) shell.openExternal(url)
		return { action: 'deny' }
	})

	win.on('maximize', () => win?.webContents.send('isMaximized'))
	win.on('unmaximize', () => win?.webContents.send('isRestored'))
}

app.on('second-instance', () => {
	if (win) {
		if (win.isMinimized()) win.restore()
		win.focus()
	}
})

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows()
	if (allWindows.length) allWindows[0].focus()
	else createWindow()
})

app.on('window-all-closed', () => {
	win = null
	process.platform !== 'darwin' && app.quit()
})

// Electron Store
//

const store = new Store({
	schema: {
		preferences: {
			type: 'object',
			default: {
				video: {
					format: 'mp4',
					quality: 0,
					bitrate: 8388608,
					fps: 30,
				},
				audio: {
					enabled: false,
					bitrate: 128000,
					volume: 1.0,
				},
				bindings: {
					start: 'Alt+1',
					stop: 'Alt+2',
				},
			},
		},
		update: {
			type: 'object',
			default: {
				available: false,
			},
		},
	},
})

ipcMain.handle(
	'electron-store',
	async (_evnet, methodSign: string, ...args: any[]) => {
		if (typeof (store as any)[methodSign] === 'function') {
			return (store as any)[methodSign](...args)
		}
		return (store as any)[methodSign]
	}
)

// Registering shortcuts and starting
//

app.whenReady()
	.then(() => {
		globalShortcut.register(store.get('preferences.bindings.start'), () => {
			win?.webContents.send('start-recording')
		})
		globalShortcut.register(store.get('preferences.bindings.stop'), () => {
			win?.webContents.send('stop-recording')
		})
	})
	.then(createWindow)

// Custom title bar handlers
//

ipcMain.on('app-minimize', () => win?.minimize())

ipcMain.on('app-maximize', () =>
	win?.isMaximized() ? win.restore() : win?.maximize()
)

ipcMain.on('app-close', () => {
	win?.close()
	win = null
	process.platform !== 'darwin' && app.quit()
})
