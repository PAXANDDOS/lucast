interface FfprobeFormat {
    [key: string]: any
    filename?: string | undefined
    nb_streams?: number | undefined
    nb_programs?: number | undefined
    format_name?: string | undefined
    format_long_name?: string | undefined
    start_time?: number | undefined
    duration?: number | undefined
    size?: number | undefined
    bit_rate?: number | undefined
    probe_score?: number | undefined
    tags?: Record<string, string | number> | undefined
}

declare type Video = {
    filename: string
    format: FfprobeFormat
    video: FfprobeFormat
    audio: FfprobeFormat
}
