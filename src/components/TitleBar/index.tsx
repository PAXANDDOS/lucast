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
            <div className={style.titleBox}>
                <h4>Lucast</h4>
            </div>
            {isDarwin || (
                <div className={style.systemBox}>
                    <div
                        data-type="min"
                        onClick={() => window.api.send('app-minimize')}
                        className={style.systemBoxProp}
                    >
                        <Minimize />
                    </div>
                    <div
                        data-type="max"
                        onClick={() => window.api.send('app-maximize')}
                        className={style.systemBoxProp}
                    >
                        {maximized}
                    </div>
                    <div
                        data-type="close"
                        onClick={() => window.api.send('app-close')}
                        className={style.systemBoxProp}
                    >
                        <Cross />
                    </div>
                </div>
            )}
        </nav>
    )
}
