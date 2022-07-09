import { BrowserWindow, desktopCapturer, ipcMain, Menu } from 'electron'

ipcMain.on('show-input-sources', (event, sources: string) => {
    const template = JSON.parse(sources).map((source: Electron.DesktopCapturerSource) => {
        return {
            label: source.name,
            click: () => {
                event.sender.send('input-source-selected', source)
            },
        }
    })

    Menu.buildFromTemplate(template).popup(
        BrowserWindow.fromWebContents(event.sender) as Electron.PopupOptions
    )
})

ipcMain.handle(
    'get-input-sources',
    async (_event, types) => await desktopCapturer.getSources({ types })
)

ipcMain.on('reset-source', event => event.sender.send('input-source-selected'))
