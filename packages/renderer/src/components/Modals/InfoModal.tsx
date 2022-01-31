import style from '@/styles/modal.module.scss'
import type { InfoModalInterface } from '@/types/InfoModal'
import Footer from '../Footers/InfoFooter'
import Modal from './Modal'
import Banner from '/img/Cover.png'

const InfoModal = ({ onClose }: InfoModalInterface) => {
	return (
		<Modal
			title="About Lucast"
			isOpen={true}
			onClose={onClose}
			Footer={<Footer />}
		>
			<div className={style.infoModal}>
				<div className={style.infoModalPreview}>
					<img src={Banner} />
				</div>
				<div className={style.infoModalContent}>
					<p className={style.infoModalContentText}>
						<b>Lucast</b> is a free screen-recording application for
						Windows, macOS, and Linux. Capture how you work, how you
						play, how you do anything, and share it with the world
						in a simple way!
					</p>
					<p
						className={style.infoModalContentText}
						style={{ opacity: 0.7, marginTop: 10, fontSize: 12 }}
					>
						<b>Developer note:</b> This project is fully free-to-use
						and supported only by me. Build with Electron and React.
						It&apos;s my first project on Electron and I&apos;m
						still learning it. Feel free to visit the GitHub page
						below, pull requests are always welcome!
					</p>
					<h4
						className={style.infoModalContentLabel}
						data-color="pink"
					>
						<span>FEATURES</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>Cool updater.</b> One simple button that will
							check if there is any update on the official
							resource. If so, it will install it for you!
						</li>
						<li>
							<b>Audio switch.</b> Now you can turn your system
							audio on and off! Remember that the audio is not
							captured directly from your system and not from a
							specific window!
						</li>
						<li>
							<b>You can change video and audio bitrate.</b> New
							options for both video and audio groups in the
							settings. Select any bitrate that you want, but
							remember, the most optional is the one with your
							screen resolution! Higher bitrate - higher image
							quality and bigger file size, lower quality -
							smaller size but an unclear image in motion.
						</li>
						<li>
							<b>This fancy log window.</b> Now you can read more
							about the update and view the update log.
						</li>
					</ul>
					<h4
						className={style.infoModalContentLabel}
						data-color="green"
					>
						<span>FIXES & OPTIMIZATION</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>No leaking.</b> The fixed memory leak that
							because of the unlimited creation of event
							listeners.
						</li>
						<li>
							<b>Video with no time.</b> Fixed metadata of the
							output video that was saved without
							&quot;start&quot; and &quot;end&quot; timestamps.
							This made video players unable to determine video
							duration and rewind it.
						</li>
						<li>
							<b>Much more.</b> A lot of fixed bugs and general
							improvements in types, scripts, and behavior.
						</li>
					</ul>
					<h4
						className={style.infoModalContentLabel}
						data-color="yellow"
					>
						<span>FEATURE LOG: v1.2.0</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>Bindings.</b> You can now start your recording
							without even opening the application! Use
							pre-defined keybindings or set yours. Start and end
							your recordings easily.
						</li>
						<li>
							<b>Storage.</b> Now all your settings are saved to
							the configuration file, so the usage is more
							comfortable!
						</li>
						<li>
							<b>Notifications.</b> Notifications for your actions
							(e.g. Starting or ending recording with a keybinding
							or checking for updates).
						</li>
						<li>
							<b>System info and updater.</b> Your system
							information is displayed alongside the application
							information. Also, start of the Updater feature
							development!
						</li>
					</ul>
					<h4
						className={style.infoModalContentLabel}
						data-color="yellow"
					>
						<span>FEATURE LOG: v1.1.0</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>Custom title bar.</b> Now there is a fancy title
							bar with window control buttons!
						</li>
						<li>
							<b>Modals.</b> Modals for application information
							and settings!
						</li>
					</ul>
					<h4
						className={style.infoModalContentLabel}
						data-color="yellow"
					>
						<span>FEATURE LOG: v1.0.0</span>
					</h4>
					<ul className={style.infoModalContentList}>
						<li>
							<b>Recorder.</b> Record your selected screen or
							window and save it to your computer!
						</li>
					</ul>
				</div>
			</div>
		</Modal>
	)
}

export default InfoModal
