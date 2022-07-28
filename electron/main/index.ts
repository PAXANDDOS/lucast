import { app, BrowserWindow, globalShortcut, ipcMain, shell } from 'electron'
import { release } from 'os'
import { join } from 'path'
import { store } from './lib/store'

import './lib/desktopCapturer'
import './lib/downloader'
import './lib/notification'
import './lib/store'
import './lib/systemInfo'
import './lib/videoHandler'

if (release().startsWith('6.1')) app.disableHardwareAcceleration()
if (process.platform === 'win32') app.setAppUserModelId(app.getName())
if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

const ROOT_PATH = {
    dist: join(__dirname, '../..'),
    public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
    resources: join(__dirname, '../resources'),
}

let win: BrowserWindow | null = null
const preload = join(__dirname, '../preload/index.js')
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const html = join(ROOT_PATH.dist, 'index.html')

app.commandLine.appendSwitch('enable-webgl')

const createWindow = async () => {
    win = new BrowserWindow({
        title: 'Lucast',
        width: 1420,
        height: 720,
        minWidth: 1040,
        minHeight: 560,
        show: false,
        icon: join(ROOT_PATH.resources, 'icon.ico'),
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload,
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    win.on('ready-to-show', () => {
        win.show()
        process.env.NODE_ENV === 'development' && win.webContents.openDevTools()
    })

    if (app.isPackaged) win.loadFile(html)
    else win.loadURL(url)

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('main-process-message', new Date().toLocaleString())
    })

    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return { action: 'deny' }
    })

    win.on('maximize', () => win.webContents.send('maximize'))
    win.on('unmaximize', () => win.webContents.send('unmaximize'))
}

app.on('second-instance', () => {
    if (!win) return
    win.isMinimized() && win.restore()
    win.focus()
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    allWindows.length ? allWindows[0].focus() : createWindow()
})

app.on('window-all-closed', () => {
    win = null
    process.platform !== 'darwin' && app.quit()
})

// Registering shortcuts and starting

app.whenReady()
    .then(() => {
        globalShortcut.register(store.get('preferences.bindings.start'), () =>
            win.webContents.send('start-recording')
        )
        globalShortcut.register(store.get('preferences.bindings.stop'), () =>
            win.webContents.send('stop-recording')
        )
    })
    .then(createWindow)

// Custom title bar handlers

ipcMain.on('app-minimize', () => win.minimize())
ipcMain.on('app-maximize', () => (win.isMaximized() ? win.restore() : win.maximize()))
ipcMain.on('app-close', () => {
    win.close()
    win = null
    process.platform !== 'darwin' && app.quit()
})
