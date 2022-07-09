/// <reference types="vite/client" />

export declare global {
    interface Window {
        api: {
            send: Electron.IpcRenderer['send']
            on: Electron.IpcRenderer['on']
            invoke: Electron.IpcRenderer['invoke']
            invokeSync: Electron.IpcRenderer['sendSync']
            removeAll: Electron.IpcRenderer['removeAllListeners']
        }
    }
}
