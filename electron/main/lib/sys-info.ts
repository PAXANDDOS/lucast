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

ipcMain.handle('get-app-path', (_event, param) => app.getPath(param))

ipcMain.addListener('get-os-info', () => {
    return {
        os:
            {
                Darwin: 'macOS',
                Linux: 'Linux',
            }[os.type()] || 'Windows',
        version: os.version(),
        arch: os.arch(),
        release: os.release(),
    }
})
