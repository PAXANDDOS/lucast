import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ModalProvider } from '#/modules/Modal/ModalProvider'
import { ToastProvider } from '#/modules/Toaster/Toaster'
import { Menu } from '@/Menu'
import { Recorder } from '@/Recorder'
import { TitleBar } from '@/TitleBar'

import 'styles/globals.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastProvider>
            <ModalProvider>
                <TitleBar />
                <main>
                    <Menu />
                    <Recorder />
                </main>
            </ModalProvider>
        </ToastProvider>
    </StrictMode>
)

postMessage({ payload: 'ready' }, '*')
