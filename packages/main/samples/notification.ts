import type { NotificationConstructorOptions } from 'electron'
import { ipcMain, Notification } from 'electron'
import { join } from 'path'

ipcMain.on(
	'show-notification',
	(
		event,
		{
			title,
			body,
			icon = join(__dirname, '../../renderer/public/icon.ico'),
		}: NotificationConstructorOptions
	) =>
		new Notification({
			title,
			body,
			icon: icon,
			urgency: 'normal',
		}).show()
)
