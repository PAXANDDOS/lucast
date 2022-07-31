declare type Video = {
    filename: string
    format: FFmpeg.FfprobeFormat
    video: FFmpeg.FfprobeStream
    audio: FFmpeg.FfprobeStream
}
