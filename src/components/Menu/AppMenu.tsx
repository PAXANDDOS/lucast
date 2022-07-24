import { formatBytes } from '#/lib/formatBytes'
import { useModal } from '#/modules/Modal/ModalProvider'

import { Info, Settings } from 'icons/Misc'
import style from 'styles/menu.module.scss'

const diskRawInfo = window.api.invokeSync('get-disk-info')

const diskInfo = {
    free: formatBytes(diskRawInfo.free),
    size: formatBytes(diskRawInfo.size),
}

export const AppMenu: React.FC = () => {
    const { showModal } = useModal()

    const handleModalChange: React.MouseEventHandler<HTMLButtonElement> = async ({
        currentTarget,
    }) => {
        const element = currentTarget
        const name = element.name.charAt(0).toUpperCase() + element.name.slice(1)
        showModal(name)
    }

    return (
        <div className={style.appMenu}>
            <span>
                {diskInfo.free} free of {diskInfo.size}
            </span>
            <div className={style.menuGroup}>
                <button className={style.menuBtn} name="info" onClick={handleModalChange}>
                    <Info />
                </button>
                <button className={style.menuBtn} name="settings" onClick={handleModalChange}>
                    <Settings />
                </button>
            </div>
        </div>
    )
}
