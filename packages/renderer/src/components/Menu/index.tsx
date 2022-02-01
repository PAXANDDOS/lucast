import { Info, Settings } from '@/assets/icons/Misc'
import InfoModal from '@/components/Modals/InfoModal'
import SettingsModal from '@/components/Modals/SettingsModal'
import style from '@/styles/menu.module.scss'
import type * as Type from '@/types/HomePage'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import VideoList from './VideoList'

const Menu = () => {
	const [modal, setModal] = useState<Type.ModalState>({
		info: false,
		settings: false,
	})

	const handleModalChange = ({ currentTarget }: MouseEvent) => {
		const element = currentTarget as HTMLButtonElement
		setModal({
			...modal,
			[element.name]: !(element.ariaChecked === 'true' && true),
		})
	}

	return (
		<div className={style.menu}>
			<div className={style.listTab}>
				<VideoList />
			</div>
			<div className={style.appMenu}>
				<span>89.3GB free of 199.6GB</span>
				<div className={style.menuGroup}>
					<button
						className={style.menuBtn}
						name="info"
						aria-checked={modal.info}
						onClick={handleModalChange}
					>
						<Info />
					</button>
					<button
						className={style.menuBtn}
						name="settings"
						aria-checked={modal.settings}
						onClick={handleModalChange}
					>
						<Settings />
					</button>
				</div>
			</div>
			{modal.info && (
				<InfoModal
					onClose={() =>
						setModal({
							...modal,
							info: !modal.info,
						})
					}
				/>
			)}
			{modal.settings && (
				<SettingsModal
					onClose={() =>
						setModal({
							...modal,
							settings: !modal.settings,
						})
					}
				/>
			)}
		</div>
	)
}

export default Menu
