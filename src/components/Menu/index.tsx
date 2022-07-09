import style from 'styles/menu.module.scss'
import { AppMenu } from './AppMenu'
import { VideoList } from './VideoList'

export const Menu: React.FC = () => (
    <div className={style.menu}>
        <div className={style.listTab}>
            <VideoList />
        </div>
        <AppMenu />
    </div>
)
