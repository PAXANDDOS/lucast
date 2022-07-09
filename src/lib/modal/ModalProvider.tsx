import { createContext, lazy, Suspense, useContext, useState } from 'react'

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
                import(/* @vite-ignore */ `@/Modals/${name}Modal.tsx`).then(module => ({
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
