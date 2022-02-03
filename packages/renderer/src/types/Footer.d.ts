export type TOs = {
	os: string
	version: string
	arch: string
	release: string
}

export type TApp = {
	name: string
	path: string
	version: string
	locale: string
}

export type TUpdate = {
	available: boolean
	version: string
	path: string
}
