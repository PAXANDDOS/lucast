import { Cross } from '@/assets/icons/Misc'
import { GitHub, Telegram } from '@/assets/icons/Social'
import style from '@/styles/modal.module.scss'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalInterface {
	title: string
	isOpen: boolean
	children: ReactNode
	Footer: ReactNode
	onClose: () => void
}

const Modal = ({
	title,
	isOpen,
	children,
	Footer,
	onClose,
}: ModalInterface) => {
	const [rendered, setRendered] = useState(isOpen)
	const containerRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		isOpen && setRendered(true)
	}, [isOpen])

	const handleClose = () => {
		if (!containerRef.current || !contentRef.current) return
		contentRef.current.className = `${style.modalContent} ${style.popOutAnimation}`
		containerRef.current.className = `${style.modalContainer} ${style.fadeOutAnimation}`
		containerRef.current.onanimationend = onClose
	}

	return createPortal(
		rendered && (
			<div className={style.modalContainer} ref={containerRef}>
				<button className={style.modalOverlay} onClick={handleClose} />
				<div className={style.modalContent} ref={contentRef}>
					<div className={style.modalHeader}>
						<h2 className={style.modalTitle}>{title}</h2>
						<button
							onClick={handleClose}
							className={style.modalCloseBtn}
						>
							<Cross />
						</button>
					</div>
					<div className={style.modalBody}>{children}</div>
					{Footer ? (
						Footer
					) : (
						<div className={style.modalFooter}>
							<a href="https://github.com/PAXANDDOS">
								<GitHub />
							</a>
							<a href="https://t.me/PAXANDDOS">
								<Telegram />
							</a>
							<span>
								Copyright © 2022{' '}
								<a href="https://paxanddos.github.io/">
									Paul Litovka
								</a>
								. All rights reserved.
							</span>
						</div>
					)}
				</div>
			</div>
		),
		document.querySelector('main') as Element
	)
}

Modal.defaultProps = {
	title: 'Modal',
	isOpen: false,
	children: null,
	Footer: null,
	onClose: () => console.warn('No action on modal close'),
}

export default Modal
