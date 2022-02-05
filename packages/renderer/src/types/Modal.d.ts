import type { ReactNode } from 'react'

export interface IModalProps {
	title: string
	isOpen: boolean
	children: ReactNode
	Footer: ReactNode
	onClose: () => void
}

export interface ICModalProps {
	onClose: () => void
}

export type TVideo = {
	format: string
	quality: number
	bitrate: number
	fps: number
}

export type TAudio = {
	enabled: boolean
	bitrate: number
	volume: number
}

export type TBinds = {
	start: string
	stop: string
}

export type TProgress = {
	current: string
	bytes: string
	total: string
}
