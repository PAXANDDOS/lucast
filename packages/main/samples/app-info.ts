import { app, ipcMain } from 'electron'

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
