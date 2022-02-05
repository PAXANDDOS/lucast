import Menu from '@/components/Menu'
import Recorder from '@/components/Recorder'
import style from '@/styles/home.module.scss'

const HomePage = () => {
	return (
		<div className={style.homePage}>
			<Menu />
			<Recorder />
		</div>
	)
}

export default HomePage
