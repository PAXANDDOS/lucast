import { app, ipcMain } from 'electron'

ipcMain.handle('get-app-info', () => {
	return {
		name: app.getName(),
		path: app.getAppPath(),
		version: app.getVersion(),
		locale: app.getLocale(),
	}
})
