import { Info, Settings } from '@/assets/icons/Misc'
import style from '@/styles/menu.module.scss'
import type { TDisk } from '@/types/Menu'
import formatBytes from '@/utils/format-bytes'
import type { MouseEvent } from 'react'
import { lazy, Suspense, useEffect, useState } from 'react'

const AppMenu = () => {
	const [Modal, setModal] = useState<any>()
	const [disk, setDisk] = useState<TDisk>()

	useEffect(() => {
		window.ipcRenderer.invoke('get-disk-space').then(res => {
			setDisk({
				free: formatBytes(res.free),
				total: formatBytes(res.size),
			})
		})
	}, [])

	const handleModalChange = async ({ currentTarget }: MouseEvent) => {
		const element = currentTarget as HTMLButtonElement
		const name = element.name.charAt(0).toUpperCase() + element.name.slice(1)
		setModal(lazy(() => import(`../Modals/${name}Modal.tsx`)))
	}

	return (
		<div className={style.appMenu}>
			<span>
				{disk?.free} free of {disk?.total}
			</span>
			<div className={style.menuGroup}>
				<button className={style.menuBtn} name="info" onClick={handleModalChange}>
					<Info />
				</button>
				<button className={style.menuBtn} name="settings" onClick={handleModalChange}>
					<Settings />
				</button>
			</div>
			<Suspense fallback={null}>{Modal && <Modal onClose={() => setModal(null)} />}</Suspense>
		</div>
	)
}

export default AppMenu
