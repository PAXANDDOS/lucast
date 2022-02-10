import { exec } from 'child_process'
import { BrowserWindow, ipcMain } from 'electron'
import { download } from 'electron-dl'

interface Completed {
	filename: string
	path: string
	fileSize: number
	mimeType: string
	url: string
}

ipcMain.on('download-file', async (event, { url, properties }) => {
	const win = BrowserWindow.getFocusedWindow() as BrowserWindow
	properties.onProgress = (status: number) => win.webContents.send('download-progress', status)
	properties.onCompleted = (status: Completed) => {
		win.webContents.send('download-completed', status)
		exec(`${status.path} /S /currentuser`)
	}
	await download(win, url, properties)
})
