import { GitHub, Telegram } from '#/assets/icons/Social'
import { Modal } from '#/modules/Modal'
import style from './infoModal.module.scss'

const InfoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <Modal title="About Lucast" onClose={onClose}>
        <div className={style.infoModal}>
            <div className={style.infoModalPreview}>
                <img src={'/cover.png'} />
            </div>
            <div className={style.infoModalContent}>
                <p className={style.infoModalContentText}>
                    <b>Lucast</b> is a free screen-recording application for Windows, macOS, and
                    Linux. Capture how you work, how you play, and how you live, and share it with
                    the world in a simple way!
                </p>
                <h4 className={style.infoModalContentLabel} data-color="green">
                    <span>FINAL RELEASE</span>
                </h4>
                <ul className={style.infoModalContentList}>
                    <li>
                        <b>Faster and more efficient.</b> Refactored the entire codebase with better
                        approaches. The application now will take up less space on the hard drive
                        and use fewer resources. Some visuals were also improved.
                    </li>
                    <li>
                        <b>Better framework.</b> Use of a totally different approach to building the
                        app. Updated a lot of important dependencies after almost a year. These
                        updates will make the app more faster and secure.
                    </li>
                    <li>
                        <b>Final release.</b> It&apos;s time for a feature freeze. Lucast already
                        has what it needs to be a good screen-recording application. I will continue
                        to support this project to improve stability and fix vulnerabilities, but no
                        new features will be added.
                    </li>
                </ul>
                <h4 className={style.infoModalContentLabel} data-color="yellow">
                    <span>FEATURE LOG: v2.1.0</span>
                </h4>
                <ul className={style.infoModalContentList}>
                    <li>
                        <b>Toast messages!</b> Until today it was impossible to tell when your
                        recorded video will be ready. This beautiful toast message will show you
                        progress on your recorded video.
                    </li>
                    <li>
                        <b>Preview control.</b> There is one more button on your control panel at
                        the bottom. The new &quot;Hide Preview&quot; button will hide the stream of
                        your screen if you don&apos;t need it. Also, this might help users on
                        low-end systems.
                    </li>
                    <li>
                        <b>Context menu for videos.</b> Besides clicking on the video to open it,
                        you can perform a right-click to open the context menu. Here you can open
                        the video, show it in your folder, or just delete it. #FeatureRequest
                    </li>
                </ul>
                <h4 className={style.infoModalContentLabel} data-color="yellow">
                    <span>FEATURE LOG: v2.0.0</span>
                </h4>
                <ul className={style.infoModalContentList}>
                    <li>
                        <b>Featuring FFmpeg and FFprobe!</b> It&apos;s a huge change in the quality
                        of recorded videos and configuration! FFmpeg helps to handle video, audio,
                        and other multimedia files and streams. What does it mean for Lucast? Now
                        you have a wide variety of formats to choose from, you can set a resolution
                        that differs from your native, you can customize your recorder video frame
                        rate, and you can configure the volume of your audio! Whatever you choose,
                        the quality of the output video will be so much better than in v1.3.0!
                        High-quality video and clear audio with small file size, that is what it
                        means!
                    </li>
                    <li>
                        <b>New UI.</b> Not just a big block with buttons now! Now there are much
                        fancier control buttons at the bottom and a menu to the left!
                    </li>
                    <li>
                        <b>New face.</b> Now Lucast has its own face! A brand new unique logo should
                        fit well!
                    </li>
                    <li>
                        <b>Menu and video list.</b> Now there is a nice menu to the left with all
                        your recorded videos, click on them to play! Or click on the folder
                        directory to open it with your explorer. Also &quot;information&quot; and
                        &quot;settings&quot; buttons are there, as well as the new information about
                        your disk usage, so you can keep track of how many videos you can record
                        until your disk drive is full.
                    </li>
                </ul>
                <h4 className={style.infoModalContentLabel} data-color="yellow">
                    <span>FEATURE LOG: v1.3.0</span>
                </h4>
                <ul className={style.infoModalContentList}>
                    <li>
                        <b>Cool updater.</b> One simple button that will check if there is any
                        update on the official resource. If so, it will install it for you!
                    </li>
                    <li>
                        <b>Audio switch.</b> Now you can turn your system audio on and off! Remember
                        that the audio is not captured directly from your system and not from a
                        specific window!
                    </li>
                    <li>
                        <b>You can change video and audio bitrate.</b> New options for both video
                        and audio groups in the settings. Select any bitrate that you want, but
                        remember, the most optional is the one with your screen resolution! Higher
                        bitrate - higher image quality and bigger file size, lower quality - smaller
                        size but an unclear image in motion.
                    </li>
                    <li>
                        <b>This fancy log window.</b> Now you can read more about the update and
                        view the update log.
                    </li>
                </ul>
                <h4 className={style.infoModalContentLabel} data-color="yellow">
                    <span>FEATURE LOG: v1.2.0</span>
                </h4>
                <ul className={style.infoModalContentList}>
                    <li>
                        <b>Bindings.</b> You can now start your recording without even opening the
                        application! Use pre-defined keybindings or set yours. Start and end your
                        recordings easily.
                    </li>
                    <li>
                        <b>Storage.</b> Now all your settings are saved to the configuration file,
                        so the usage is more comfortable!
                    </li>
                    <li>
                        <b>Notifications.</b> Notifications for your actions (e.g. Starting or
                        ending recording with a keybinding or checking for updates).
                    </li>
                    <li>
                        <b>System info and updater.</b> Your system information is displayed
                        alongside the application information. Also, the start of the Updater beta
                        testing!
                    </li>
                </ul>
                <h4 className={style.infoModalContentLabel} data-color="yellow">
                    <span>FEATURE LOG: v1.1.0</span>
                </h4>
                <ul className={style.infoModalContentList}>
                    <li>
                        <b>Custom title bar.</b> Now there is a fancy title bar with window control
                        buttons!
                    </li>
                    <li>
                        <b>Modals.</b> Modals for application information and settings!
                    </li>
                </ul>
                <h4 className={style.infoModalContentLabel} data-color="yellow">
                    <span>FEATURE LOG: v1.0.0</span>
                </h4>
                <ul className={style.infoModalContentList}>
                    <li>
                        <b>Recorder.</b> Record your selected screen or window and save it to your
                        computer!
                    </li>
                </ul>
            </div>
        </div>
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
    </Modal>
)

export default InfoModal
