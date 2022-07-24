import { app, ipcMain } from 'electron'
import os from 'os'

ipcMain.addListener(
    'get-app-info',
    event =>
        (event.returnValue = {
            name: app.getName(),
            path: app.getAppPath(),
            version: app.getVersion(),
            locale: app.getLocale(),
        })
)

ipcMain.addListener('get-app-path', (event, param) => (event.returnValue = app.getPath(param)))

ipcMain.addListener(
    'get-os-info',
    event =>
        (event.returnValue = {
            os:
                {
                    Darwin: 'macOS',
                    Linux: 'Linux',
                }[os.type()] || 'Windows',
            version: os.version(),
            arch: os.arch(),
            release: os.release(),
        })
)
