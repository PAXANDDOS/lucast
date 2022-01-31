import { dialog, ipcMain } from 'electron'
import { writeFile } from 'fs'

ipcMain.on('save-blob', async (event, blob) => {
	const { filePath } = await dialog.showSaveDialog({
		title: 'Save your recording',
		buttonLabel: 'Save',
		defaultPath: `lucast-${Date.now()}.webm`,
		filters: [{ name: 'Movies', extensions: ['webm'] }],
	})
	if (filePath)
		writeFile(filePath, Buffer.from(blob), () =>
			console.log('Video saved!')
		)
})

ipcMain.handle('create-buffer', async (event, blob) => {
	return Buffer.from(await blob.arrayBuffer())
})

ipcMain.handle('get-save-path', async (event, ext) => {
	const { filePath } = await dialog.showSaveDialog({
		title: 'Save your recording',
		buttonLabel: 'Save',
		defaultPath: `lucast-${Date.now()}.${ext}`,
		filters: [{ name: 'Movies', extensions: [ext] }],
	})
	if (filePath) return filePath
})
