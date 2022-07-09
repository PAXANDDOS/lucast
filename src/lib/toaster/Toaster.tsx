import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Loading, Success, Warning } from 'icons/Misc'
import style from './toaster.module.scss'

const ProviderContext = createContext<Toast>(null!)
export const useToast = () => useContext(ProviderContext)

interface Toast {
    loading: (title?: string) => void
    success: (title?: string) => void
    error: (message?: string) => void
    clear: () => void
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [rendered, setRendered] = useState(false)
    const [title, setTitle] = useState('')
    const [icon, setIcon] = useState<JSX.Element | null>(null)
    const [mounted, setMounted] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    useEffect(() => {
        window.api.on('video-process-started', () => setRendered(true))
        window.api.on('video-process-progress', (_event, progress: number) =>
            loading(`${progress}% processed`)
        )
        window.api.on('video-process-ended', clear)
        return () => {
            window.api.removeAll('video-process-started')
            window.api.removeAll('video-process-progress')
            window.api.removeAll('video-process-ended')
        }
    }, [])

    const loading = (title?: string) => {
        title ? setTitle(title) : setTitle('Processing...')
        setIcon(<Loading className={style.spinAnimation} />)
        setRendered(true)
    }

    const success = (message?: string) => {
        message ? setTitle(message) : setTitle('Success')
        setIcon(<Success />)
        setRendered(true)
        setTimeout(clear, 5000)
    }

    const error = (message?: string) => {
        message ? setTitle(message) : setTitle('Error occured')
        setIcon(<Warning />)
        setRendered(true)
        setTimeout(clear, 5000)
    }

    const clear = () => {
        if (!ref.current) return
        ref.current.className = `${style.toast} ${style.popDownAnimation}`
        ref.current.onanimationend = () => setRendered(false)
    }

    return (
        <>
            <ProviderContext.Provider
                value={{
                    loading,
                    success,
                    error,
                    clear,
                }}
            >
                {children}
            </ProviderContext.Provider>
            {mounted &&
                createPortal(
                    rendered && (
                        <div className={style.toastContainer}>
                            <div className={style.toast} ref={ref}>
                                {icon}
                                <span>{title}</span>
                            </div>
                        </div>
                    ),
                    document.getElementById('__next')!
                )}
        </>
    )
}
