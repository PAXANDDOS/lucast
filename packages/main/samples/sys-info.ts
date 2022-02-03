import { app, ipcMain } from 'electron'
import os from 'os'

ipcMain.handle('get-app-info', () => {
	return {
		name: app.getName(),
		path: app.getAppPath(),
		version: app.getVersion(),
		locale: app.getLocale(),
	}
})

ipcMain.handle('get-app-path', (event, param) => {
	return app.getPath(param)
})

ipcMain.handle('get-os-info', () => {
	let userOs = 'Windows'
	switch (os.type()) {
		case 'Darwin':
			userOs = 'macOS'
			break
		case 'Linux':
			userOs = 'Linux'
			break
	}
	return {
		os: userOs,
		version: os.version(),
		arch: os.arch(),
		release: os.release(),
	}
})
