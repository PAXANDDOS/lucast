import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ToastProvider } from '#/lib/toaster/Toaster'
import { Menu } from '@/Menu'
import { Recorder } from '@/Recorder'
import { TitleBar } from '@/TitleBar'
import { ModalProvider } from './lib/modal/ModalProvider'

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
