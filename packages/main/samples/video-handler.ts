import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import { path as ffprobePath } from '@ffprobe-installer/ffprobe'
import checkDiskSpace from 'check-disk-space'
import { app, ipcMain, shell } from 'electron'
import type { FfprobeData } from 'fluent-ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import { existsSync, mkdirSync, readdirSync } from 'fs'
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

	const data = await Promise.all(
		filenames.map((filename) => ffprobeAsync(join(dir, filename)))
	)

	return data.map((object) => {
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
		.on('start', () => console.log('start'))
		.on('progress', (progress) => console.log(progress))
		.on('end', () => event.sender.send('all-videos-updated'))
		.on('error', (error) =>
			console.log('Failed to process video: ' + error)
		)

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
