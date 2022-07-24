import type { FfprobeFormat, FfprobeStream } from 'fluent-ffmpeg'

export type Video = {
    filename: string
    format: FfprobeFormat
    video: FfprobeStream
    audio: FfprobeStream
}
