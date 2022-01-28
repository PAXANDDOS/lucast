import { ipcMain } from 'electron'
import os from 'os'

ipcMain.handle('get-os-info', () => {
	return {
		version: os.version(),
		arch: os.arch(),
		release: os.release(),
	}
})
