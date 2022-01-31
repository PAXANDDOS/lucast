export type OsInfo = {
	os: string
	version: string
	arch: string
	release: string
}

export type AppInfo = {
	name: string
	path: string
	version: string
	locale: string
}

export type UpdateData = {
	available: boolean
	version: string
	path: string
}
