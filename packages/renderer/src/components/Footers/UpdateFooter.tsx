import { Download, Update } from '@/assets/icons/Misc'
import style from '@/styles/modal.module.scss'
import type { TApp, TOs, TUpdate } from '@/types/Footer'
import store from '@/utils/electron-store'
import sleep from '@/utils/sleep'
import versionCmp from '@/utils/version-cmp'
import { useEffect, useRef, useState } from 'react'
import UpdateModal from '../Modals/UpdateModal'

const UpdateBlock = () => {
	const [osInfo, setOsInfo] = useState<TOs>()
	const [appInfo, setAppInfo] = useState<TApp>()
	const [updateData, setUpdateData] = useState<TUpdate>()
	const [isUpdating, setIsUpdating] = useState(false)
	const updateRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		store.get('update').then((res) => setUpdateData(res))
		window.ipcRenderer.invoke('get-os-info').then((res) => setOsInfo(res))
		window.ipcRenderer.invoke('get-app-info').then((res) => setAppInfo(res))
	}, [])

	const checkUpdates = async () => {
		if (
			!updateRef.current ||
			!appInfo ||
			updateRef.current.className === style.spinAnimation
		)
			return
		updateRef.current.className = style.spinAnimation

		const response = await fetch(
			'https://api.github.com/repos/paxanddos/lucast-electron/releases/latest'
		)
		const release = await response.json()
		release.tag_name = release.tag_name.substring(1)
		await sleep(2000)

		switch (versionCmp(release.tag_name, appInfo.version)) {
			case 1:
				break
			case 0:
				updateRef.current.className = ''
				return new Notification('You are already up-to-date!')
			case -1:
				updateRef.current.className = ''
				return new Notification('You are a cheater!')
			default:
				updateRef.current.className = ''
				return new Notification('An error occured.')
		}

		const suffix = osInfo?.os === 'Windows' ? 'Setup' : 'Installer'
		let ext = 'exe'
		switch (osInfo?.os) {
			case 'macOS':
				ext = 'dmg'
				break
			case 'Linux':
				ext = 'AppImage'
				break
		}
		const userAsset = `Lucast-${suffix}.${ext}`
		let path = 'link'

		release.assets.forEach(function (asset: any) {
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
		return new Notification('Update available!')
	}

	const installUpdate = () => setIsUpdating(true)

	return (
		<div className={style.modalFooterSettings}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>Stable v{appInfo?.version} (05.02.2022)</span>
				<span>
					{osInfo?.version} {osInfo?.arch} ({osInfo?.release})
				</span>
			</div>
			{updateData?.available ? (
				<button
					className={style.checkForUpdatesBtn}
					onClick={installUpdate}
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
				<button
					className={style.checkForUpdatesBtn}
					onClick={checkUpdates}
				>
					<div ref={updateRef}>
						<Update />
					</div>
					<span>Check for update</span>
				</button>
			)}
			{isUpdating && <UpdateModal />}
		</div>
	)
}

export default UpdateBlock
