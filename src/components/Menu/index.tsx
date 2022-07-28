import { AppMenu } from './AppMenu'
import { VideoList } from './VideoList'

import style from './menu.module.scss'

export const Menu: React.FC = () => (
    <div className={style.menu}>
        <VideoList />
        <AppMenu />
    </div>
)
