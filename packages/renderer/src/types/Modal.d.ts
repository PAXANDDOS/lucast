import type { ReactNode } from 'react'

export interface ModalInterface {
	title: string
	isOpen: boolean
	children: ReactNode
	Footer: ReactNode
	onClose: () => void
}
