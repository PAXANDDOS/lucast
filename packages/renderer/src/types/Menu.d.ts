import type { FfprobeFormat, FfprobeStream } from 'fluent-ffmpeg'

export type TDisk = {
	free: string
	total: string
}

export type TVideo = {
	filename: string
	format: FfprobeFormat
	video: FfprobeStream
	audio: FfprobeStream
}

export interface IVideoProps {
	video: TVideo
}
