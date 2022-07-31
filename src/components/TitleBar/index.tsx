import { useEffect, useState } from 'react'

import { Cross, Maximize, MaximizeRestore, Minimize } from 'icons/Misc'
import style from './titleBar.module.scss'

const isDarwin = window.api.invokeSync('get-os-info').os === 'macOS'

export const TitleBar: React.FC = () => {
    const [maximized, setMaximized] = useState(<Maximize />)

    useEffect(() => {
        window.api.on('maximize', () => setMaximized(<MaximizeRestore />))
        window.api.on('unmaximize', () => setMaximized(<Maximize />))
    }, [])

    return (
        <nav
            className={style.titleBar}
            style={{
                justifyContent: isDarwin ? 'center' : 'space-between',
            }}
        >
            <h4 className={style.title}>Lucast</h4>
            {isDarwin || (
                <div className={style.handlers}>
                    <div onClick={() => window.api.send('app-minimize')} className={style.handler}>
                        <Minimize />
                    </div>
                    <div onClick={() => window.api.send('app-maximize')} className={style.handler}>
                        {maximized}
                    </div>
                    <div
                        data-type="danger"
                        onClick={() => window.api.send('app-close')}
                        className={style.handler}
                    >
                        <Cross />
                    </div>
                </div>
            )}
        </nav>
    )
}
