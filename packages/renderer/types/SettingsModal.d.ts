export interface SettingsModalInterface {
	onClose: () => void
}

export type Video = {
	format: string
}

export type Audio = {
	enabled: boolean
}

export type Binds = {
	start: string
	stop: string
}
