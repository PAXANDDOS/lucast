import style from '@/styles/modal.module.scss'
import type { ICModalProps } from '@/types/Modal'
import Footer from '../Footers/InfoFooter'
import Modal from './Modal'
import Banner from '/img/Cover.png'

const InfoModal = ({ onClose }: ICModalProps) => {
	return (
		<Modal title="About Lucast" isOpen={true} onClose={onClose} Footer={<Footer />}>
			<div className={style.infoModal}>
				<div className={style.infoModalPreview}>
					<img src={Banner} />
				</div>
				<div className={style.infoModalContent}>
					<p className={style.infoModalContentText}>
						<b>Lucast</b> is a free screen-recording application for Windows, macOS, and
						Linux. Capture how you work, how you play, how you do anything, and share it
						with the world in a simple way!
					</p>
					<p
						className={style.infoModalContentText}
						style={{ marginTop: 10, fontSize: 14 }}
					>
						<b>Found a bug?</b>{' '}
						<a
							href="https://github.com/PAXANDDOS/lucast-electron/issues/new"
							target="_blank"
							rel="noreferrer"
							style={{ opacity: 0.8, color: '#fee75c' }}
						>
							Report it here!
						</a>
					</p>
					<p
						className={style.infoModalContentText}
						style={{ opacity: 0.7, marginTop: 10, fontSize: 12 }}
					>
						<b>Developer note:</b> This project is fully free-to-use and supported only
						by me. Build with Electron and React. It&apos;s my first project on Electron
						and I&apos;m still learning it. Feel free to visit the GitHub page below,
						pull requests are always welcome!
					</p>
					<h4 className={style.infoModalContentLabel} data-color="pink">
						<span>FEATURES</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>Toast messages!</b> Until today it was impossible to tell when your
							recorded video will be ready. This beautiful toast message will show you
							progress on your recorded video.
						</li>
						<li>
							<b>Preview control.</b> There is one more button on your control panel
							at the bottom. The new &quot;Hide Preview&quot; button will hide the
							stream of your screen if you don&apos;t need it. Also, this might help
							users on low-end systems.
						</li>
						<li>
							<b>Context menu for videos.</b> Besides clicking on the video to open
							it, you can perform a right-click to open the context menu. Here you can
							open the video, show it in your folder, or just delete it.
							#FeatureRequest
						</li>
					</ul>
					<h4 className={style.infoModalContentLabel} data-color="green">
						<span>FIXES & IMPROVEMENTS</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>Fixed title bar on macOS.</b> macOS had the same title bar as windows
							but also its traffic lights. This update fixes this issue to only have
							traffic lights and the Lucast at the center.
						</li>
						<li>
							<b>Better spin animation.</b> Spin animation, which is used in toast
							loading icons and update icons, has been improved to spin with the same
							speed linearly.
						</li>
						<li>
							<b>New package manager.</b>
						</li>
						<li>
							<b>Updated build tool.</b>
						</li>
						<li>
							<b>Minor fixes.</b>
						</li>
					</ul>
					<h4 className={style.infoModalContentLabel} data-color="yellow">
						<span>FEATURE LOG: v2.0.0</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>Featuring FFmpeg and FFprobe!</b> It&apos;s a huge change for the
							quality of recorded videos and configuration! FFmpeg helps to handle
							video, audio, and other multimedia files and streams. What does it mean
							for Lucast? Now you have a wide variety of formats to choose from, you
							can set a resolution that differs from your native, you can customize
							your recorder videos frame rate, and you can configure the volume of
							your audio! Whatever you choose, the quality of the output video will be
							so much better than in v1.3.0! High-quality video and clear audio with a
							small file size, that is what it means!
						</li>
						<li>
							<b>New UI.</b> Not just a big block with buttons now! Now there are much
							fancier control buttons at the bottom and a menu to the left!
						</li>
						<li>
							<b>New face.</b> Now Lucast has its own face! A brand new unique logo
							should fit well!
						</li>
						<li>
							<b>Menu and video list.</b> Now there is a nice menu to the left with
							all your recorded videos, click on them to play! Or click on the folder
							directory to open it with your explorer. Also &quot;information&quot;
							and &quot;settings&quot; buttons are there, as well as the new
							information about your disk usage, so you can keep track of how many
							videos you can record until your disk drive is full.
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
							<b>Audio switch.</b> Now you can turn your system audio on and off!
							Remember that the audio is not captured directly from your system and
							not from a specific window!
						</li>
						<li>
							<b>You can change video and audio bitrate.</b> New options for both
							video and audio groups in the settings. Select any bitrate that you
							want, but remember, the most optional is the one with your screen
							resolution! Higher bitrate - higher image quality and bigger file size,
							lower quality - smaller size but an unclear image in motion.
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
							<b>Bindings.</b> You can now start your recording without even opening
							the application! Use pre-defined keybindings or set yours. Start and end
							your recordings easily.
						</li>
						<li>
							<b>Storage.</b> Now all your settings are saved to the configuration
							file, so the usage is more comfortable!
						</li>
						<li>
							<b>Notifications.</b> Notifications for your actions (e.g. Starting or
							ending recording with a keybinding or checking for updates).
						</li>
						<li>
							<b>System info and updater.</b> Your system information is displayed
							alongside the application information. Also, start of the Updater
							feature development!
						</li>
					</ul>
					<h4 className={style.infoModalContentLabel} data-color="yellow">
						<span>FEATURE LOG: v1.1.0</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>Custom title bar.</b> Now there is a fancy title bar with window
							control buttons!
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
							<b>Recorder.</b> Record your selected screen or window and save it to
							your computer!
						</li>
					</ul>
				</div>
			</div>
		</Modal>
	)
}

export default InfoModal
