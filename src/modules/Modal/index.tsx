import { createContext, lazy, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Cross } from 'icons/Misc'
import style from './modal.module.scss'

type Props = {
    title: string
    isOpen: boolean
    children: React.ReactNode
    Footer: React.ReactNode
    onClose: () => void
}

export const Modal: React.FC<Props> = ({ title, isOpen, children, Footer, onClose }) => {
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
        document.querySelector('main')!
    )
}

Modal.defaultProps = {
    title: 'Modal',
    isOpen: false,
    children: null,
    Footer: null,
    onClose: () => console.warn('No action on modal close'),
}

const ProviderContext = createContext<Modal>(null!)
export const useModal = () => useContext(ProviderContext)

interface Modal {
    showModal: (name: string, payload?: object) => void
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [Modal, setModal] = useState<any>()
    const [props, setProps] = useState<object>()

    const showModal = (name: string, payload?: typeof props) => {
        setProps(payload)
        setModal(
            lazy(() =>
                import(`../../components/Modals/${name}Modal.tsx`).then(module => ({
                    default: module[name],
                }))
            )
        )
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
