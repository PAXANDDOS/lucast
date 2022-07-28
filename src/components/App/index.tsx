import { Menu } from '@/Menu'
import { Recorder } from '@/Recorder'

import style from './app.module.scss'

export const App: React.FC = () => (
    <main className={style.app}>
        <Menu />
        <Recorder />
    </main>
)
