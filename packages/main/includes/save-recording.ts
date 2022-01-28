import { dialog, ipcMain } from 'electron'
import { writeFile } from 'fs'

ipcMain.on('save-blob', async (event, blob) => {
	const date = new Date()
	const { filePath } = await dialog.showSaveDialog({
		title: 'Save your recording',
		buttonLabel: 'Save',
		defaultPath: `lucast-${date.getTime()}.webm`,
		filters: [{ name: 'Movies', extensions: ['webm'] }],
	})
	if (filePath)
		writeFile(filePath, Buffer.from(blob), () =>
			console.log('Video saved!')
		)
})
