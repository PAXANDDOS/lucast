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

ipcMain.on('download-update', async (event, { url, properties }) => {
    properties.onProgress = (status: number) => event.sender.send('download-progress', status)
    properties.onCompleted = (status: Completed) => {
        event.sender.send('download-completed', status)
        exec(`${status.path} /S /currentuser`)
    }
    await download(BrowserWindow.getFocusedWindow()!, url, properties)
})
