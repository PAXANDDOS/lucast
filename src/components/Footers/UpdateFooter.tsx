import { useEffect, useRef, useState } from 'react'

import { Download, Update } from 'icons/Misc'
import style from 'styles/modal.module.scss'
import { UpdateModal } from '../Modals/UpdateModal'

import { compareVersions } from '#/lib/compareVersions'
import { sleep } from '#/lib/sleep'
import store from '#/lib/store'

const osInfo = window.api.invokeSync('get-os-info') as OSInfo
const appInfo = window.api.invokeSync('get-app-info') as AppInfo

export const UpdateFooter: React.FC = () => {
    const [updateData, setUpdateData] = useState<UpdatePayload>()
    const [isUpdating, setIsUpdating] = useState(false)
    const updateRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        store.get('update').then(res => setUpdateData(res))
    }, [])

    const checkUpdates = async () => {
        if (!updateRef.current || !appInfo || updateRef.current.className === style.spinAnimation)
            return
        updateRef.current.className = style.spinAnimation

        const release = await fetch(
            'https://api.github.com/repos/paxanddos/lucast-electron/releases/latest'
        ).then(res => res.json())

        release.tag_name = release.tag_name.substring(1)
        await sleep(2000)

        switch (compareVersions(release.tag_name, appInfo.version)) {
            case 1:
                break
            case 0:
                updateRef.current.className = ''
                return window.api.send('show-notification', {
                    title: 'You are already up-to-date!',
                })
            case -1:
                updateRef.current.className = ''
                return window.api.send('show-notification', {
                    title: 'You are a cheater!',
                })
            default:
                updateRef.current.className = ''
                return window.api.send('show-notification', {
                    title: 'An error occured.',
                })
        }

        const suffix = osInfo.os === 'Windows' ? 'Setup' : 'Installer'
        const ext =
            {
                macOS: 'dmg',
                Linux: 'AppImage',
            }[osInfo.os] || 'exe'

        const userAsset = `Lucast-${suffix}.${ext}`
        let path = 'link'

        release.assets.forEach((asset: any) => {
            if (asset.name === userAsset) path = asset.browser_download_url
        })

        await store.set('update.available', true)
        await store.set('update.version', release.tag_name)
        await store.set('update.path', path)

        updateRef.current.className = ''
        setUpdateData({
            available: true,
            version: release.tag_name,
            path: path,
        })

        window.api.send('show-notification', {
            title: 'Update available!',
        })
    }

    return (
        <div className={style.modalFooterSettings}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Stable v{appInfo.version} (10.02.2022)</span>
                <span>
                    {osInfo.version} {osInfo.arch} ({osInfo.release})
                </span>
            </div>
            {updateData?.available ? (
                <button
                    className={style.checkForUpdatesBtn}
                    onClick={() => setIsUpdating(true)}
                    style={{
                        background: '#6772eb',
                    }}
                >
                    <div>
                        <Download name="nofill" />
                    </div>
                    <span style={{ color: 'white' }}>Download update</span>
                </button>
            ) : (
                <button className={style.checkForUpdatesBtn} onClick={checkUpdates}>
                    <div ref={updateRef}>
                        <Update />
                    </div>
                    <span>Check for updates</span>
                </button>
            )}
            {isUpdating && <UpdateModal />}
        </div>
    )
}

type OSInfo = {
    os: string
    version: string
    arch: string
    release: string
}

type AppInfo = {
    name: string
    path: string
    version: string
    locale: string
}

type UpdatePayload = {
    available: boolean
    version: string
    path: string
}
