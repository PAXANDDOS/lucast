import { Cross } from '@/assets/icons/Misc'
import style from '@/styles/modal.module.scss'
import type { IModalProps } from '@/types/Modal'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ title, isOpen, children, Footer, onClose }: IModalProps) => {
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
						<button onClick={handleClose} className={style.modalCloseBtn}>
							<Cross />
						</button>
					</div>
					<div className={style.modalBody}>{children}</div>
					{Footer && Footer}
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
