import { GitHub, Telegram } from 'icons/Social'
import style from 'styles/modal.module.scss'

export const InfoFooter: React.FC = () => (
    <div className={style.modalFooter}>
        <a href="https://github.com/PAXANDDOS" target="_blank" rel="noreferrer">
            <GitHub />
        </a>
        <a href="https://t.me/PAXANDDOS" target="_blank" rel="noreferrer">
            <Telegram />
        </a>
        <span>
            Copyright © 2022{' '}
            <a href="https://paxanddos.github.io/" target="_blank" rel="noreferrer">
                Paul Litovka
            </a>
            . All rights reserved.
        </span>
    </div>
)
