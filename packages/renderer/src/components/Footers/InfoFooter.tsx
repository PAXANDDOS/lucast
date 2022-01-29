import { GitHub, Telegram } from '@/assets/icons/Social'
import style from '@/styles/modal.module.scss'

const InfoFooter = () => {
	return (
		<div className={style.modalFooter}>
			<a href="https://github.com/PAXANDDOS">
				<GitHub />
			</a>
			<a href="https://t.me/PAXANDDOS">
				<Telegram />
			</a>
			<span>
				Copyright © 2022{' '}
				<a href="https://paxanddos.github.io/">Paul Litovka</a>. All
				rights reserved.
			</span>
		</div>
	)
}

export default InfoFooter
