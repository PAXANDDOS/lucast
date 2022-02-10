import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import { path as ffprobePath } from '@ffprobe-installer/ffprobe'
import checkDiskSpace from 'check-disk-space'
import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import type { FfprobeData } from 'fluent-ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import { existsSync, mkdirSync, readdirSync, unlink } from 'fs'
import { join } from 'path'
import { Readable } from 'stream'

ffmpeg.setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'))
ffmpeg.setFfprobePath(ffprobePath.replace('app.asar', 'app.asar.unpacked'))

const dir = join(app.getPath('videos'), app.getName())

if (!existsSync(dir)) mkdirSync(dir)

ipcMain.handle('get-all-videos', async () => {
	const filenames = readdirSync(dir)
	if (!filenames) return []

	const ffprobeAsync = (dir: string) =>
		new Promise<FfprobeData>((resolve, reject) => {
			return ffmpeg.ffprobe(dir, (err, metadata) => {
				if (err) return reject(err)
				resolve(metadata)
			})
		})

	const data = await Promise.all(filenames.map(filename => ffprobeAsync(join(dir, filename))))

	return data.map(object => {
		return {
			filename: object.format.filename?.split('\\').pop(),
			format: object.format,
			video: object.streams[0],
			audio: object.streams[1],
		}
	})
})

ipcMain.handle('get-videos-path', () => dir)
ipcMain.on('open-videos-folder', () => shell.openPath(dir))
ipcMain.on('open-video', (event, path) => shell.openPath(path))
ipcMain.handle('get-disk-space', () => checkDiskSpace(dir))

ipcMain.on('save-blob', async (event, { blob, duration, video, audio }) => {
	const stream = Readable.from(Buffer.from(blob))

	const command = ffmpeg()
		.input(stream)
		.setDuration(duration)
		.on('start', () => event.sender.send('video-process-started'))
		.on('progress', progress => {
			const b = progress.timemark.split('.')
			const a = b[0].split(':')
			const ms = +a[0] * 120 + +a[1] * 60 + +a[2] * 1000 + +b[1]
			event.sender.send('video-process-progress', ((100 * ms) / duration).toFixed())
		})
		.on('end', () => {
			event.sender.send('video-process-ended')
			event.sender.send('all-videos-updated')
		})
		.on('error', error => console.log('Failed to process video: ' + error))

	if (audio.enabled && video.format !== 'gif')
		command
			.audioBitrate(audio.bitrate / 1000)
			.audioFilters(`volume=${audio.volume}`)
			.audioChannels(2)
			.audioFrequency(44100)
			.audioCodec('aac')
	else command.withNoAudio()

	let codec = 'libx264'
	switch (video.format) {
		case 'webm':
			audio.enabled && command.audioCodec('libvorbis')
			codec = 'libvpx'
			break
		case 'avi':
			codec = 'libxvid'
			break
		case 'gif':
			command
				.size('?x' + video.quality)
				.fps(video.fps)
				.output(join(dir, `lucast-${Date.now()}.${video.format}`))
				.run()
			return
	}

	if (video.quality !== 0) command.size('?x' + video.quality)

	command
		.videoCodec(codec)
		.videoBitrate(video.bitrate / 1000)
		.fps(video.fps)
		.format(video.format)
		.output(join(dir, `lucast-${Date.now()}.${video.format}`))

	command.run()
})

ipcMain.on('show-video-context', async (event, video) => {
	const template = [
		{
			label: 'Open',
			click: () => shell.openPath(video.format.filename),
		},
		{
			label: 'Show in folder',
			click: () => shell.showItemInFolder(video.format.filename),
		},
		{
			label: 'Delete',
			click: () => {
				if (existsSync(video.format.filename))
					unlink(video.format.filename, () => event.sender.send('all-videos-updated'))
				else event.sender.send('all-videos-updated')
			},
		},
	]

	Menu.buildFromTemplate(template).popup(
		BrowserWindow.fromWebContents(event.sender) as Electron.PopupOptions
	)
})
