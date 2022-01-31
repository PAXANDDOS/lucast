export interface SettingsModalInterface {
	onClose: () => void
}

export type Video = {
	format: string
	bitrate: string
}

export type Audio = {
	enabled: boolean
	bitrate: string
}

export type Binds = {
	start: string
	stop: string
}
