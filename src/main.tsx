import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ModalProvider } from '#/modules/Modal/ModalProvider'
import { ToastProvider } from '#/modules/Toaster/Toaster'

import { App } from '@/App'
import { TitleBar } from '@/TitleBar'
import 'styles/globals.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastProvider>
            <ModalProvider>
                <TitleBar />
                <App />
            </ModalProvider>
        </ToastProvider>
    </StrictMode>
)

postMessage({ payload: 'ready' }, '*')
