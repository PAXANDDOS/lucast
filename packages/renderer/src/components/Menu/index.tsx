import style from '@/styles/menu.module.scss'
import AppMenu from './AppMenu'
import VideoList from './VideoList'

const Menu = () => {
	return (
		<div className={style.menu}>
			<div className={style.listTab}>
				<VideoList />
			</div>
			<AppMenu />
		</div>
	)
}

export default Menu
