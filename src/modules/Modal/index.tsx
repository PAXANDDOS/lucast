import { createContext, lazy, Suspense, useContext, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Cross } from 'icons/Misc'
import style from './modal.module.scss'

type Props = {
    title: string
    children: React.ReactNode
    onClose: () => void
}

export const Modal: React.FC<Props> = ({ title, children, onClose }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const handleClose = () => {
        if (!containerRef.current || !contentRef.current) return
        contentRef.current.className = `${style.modalContent} ${style.popOutAnimation}`
        containerRef.current.className = `${style.modalContainer} ${style.fadeOutAnimation}`
        containerRef.current.onanimationend = onClose
    }

    return createPortal(
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
            </div>
        </div>,
        document.getElementById('root')!
    )
}

Modal.defaultProps = {
    title: 'Modal',
    children: undefined,
    onClose: () => console.warn('No action on modal close'),
}

const ProviderContext = createContext<Modal>(null!)
export const useModal = () => useContext(ProviderContext)

interface Modal {
    showModal: (name: string, payload?: object) => void
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [Modal, setModal] = useState<any>(null)
    const [props, setProps] = useState<object>()

    const showModal = (name: string, payload?: typeof props) => {
        setProps(payload)
        setModal(lazy(() => import(`../../components/Modals/${name}Modal.tsx`)))
    }

    return (
        <>
            <ProviderContext.Provider
                value={{
                    showModal,
                }}
            >
                {children}
            </ProviderContext.Provider>
            <Suspense fallback={null}>
                {Modal && <Modal onClose={() => setModal(null)} {...props} />}
            </Suspense>
        </>
    )
}
