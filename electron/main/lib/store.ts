import { ipcMain } from 'electron'
import Store from 'electron-store'

export const store = new Store({
    schema: {
        preferences: {
            type: 'object',
            default: {
                video: {
                    format: 'mp4',
                    quality: 0,
                    bitrate: 8388608,
                    fps: 30,
                },
                audio: {
                    enabled: false,
                    bitrate: 128000,
                    volume: 1.0,
                },
                bindings: {
                    start: 'Alt+1',
                    stop: 'Alt+2',
                },
                previewEnabled: true,
            },
        },
        update: {
            type: 'object',
            default: {
                available: false,
            },
        },
    },
})

ipcMain.handle('electron-store', async (_event, methodSign: string, ...args: any[]) => {
    if (typeof store[methodSign] === 'function') return store[methodSign](...args)
    return store[methodSign]
})
