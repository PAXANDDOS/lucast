import type { NotificationConstructorOptions } from 'electron'
import { ipcMain, Notification } from 'electron'
import { join } from 'path'

ipcMain.on(
    'show-notification',
    (
        _event,
        {
            title,
            body,
            icon = join(__dirname, '../../resources/icon.ico'),
        }: NotificationConstructorOptions
    ) =>
        new Notification({
            title,
            body,
            icon: icon,
            urgency: 'normal',
        }).show()
)
