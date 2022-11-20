import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { formatBytes } from '#/lib/formatBytes'
import store from '#/lib/store'

import { ProgressBar } from '@/ProgressBar'
import { Logo } from 'icons/Brand'
import style from './updateModal.module.scss'

const tempDir = window.api.invokeSync('get-app-path', 'temp')

export const UpdateModal: React.FC = () => {
    const [progress, setProgress] = useState<Progress>({
        current: 'Initializing...',
        bytes: '0 Bytes',
        total: '',
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        store.get('update.path').then(path =>
            window.api.send('download-file', {
                path,
                properties: { tempDir },
            })
        )
        window.api.on('download-progress', (_event, status) =>
            setProgress({
                current: `${Math.floor(status.percent * 100)}%`,
                bytes: formatBytes(status.transferredBytes),
                total: progress?.total ? progress?.total : formatBytes(status.totalBytes),
            })
        )
        window.api.on('download-completed', (_event, status) => {
            store.set('update.available', false)
            const size = formatBytes(status.fileSize)
            setProgress({
                current: 'Installing...',
                bytes: size,
                total: size,
            })
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return createPortal(
        <div
            className={style.modalContainer}
            ref={containerRef}
            style={{
                background: 'rgb(44, 47, 51)',
                height: '100%',
            }}
        >
            <button
                className={style.modalOverlay}
                style={{ opacity: 0.4, height: '100%', cursor: 'default' }}
            />
            <div className={style.modalContent} ref={contentRef}>
                <div className={style.modalBody}>
                    <div className={style.updateModal}>
                        <div className={style.updateLogoBox}>
                            <Logo />
                        </div>
                        <div className={style.updateDataBox}>
                            <h1>{progress.current}</h1>
                            <ProgressBar current={progress.current.slice(0, -1)} />
                            <span>
                                Downloaded {progress.bytes} of {progress.total}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('root')!
    )
}

type Progress = {
    current: string
    bytes: string
    total: string
}
