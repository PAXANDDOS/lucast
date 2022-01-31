<p align='center'><img src="https://raw.githubusercontent.com/PAXANDDOS/PAXANDDOS/main/lucast/icon.svg" height="120"></p>
<p align="center">
        <a href="https://www.electronjs.org/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg" height="50">
        </a>
        <a href="https://reactjs.org/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="50">
        </a>
        <a href="https://vitejs.dev/" target="_blank">
            <img src="https://vitejs.dev/logo.svg" height="50">
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" height="50">
        </a>
        <a href="https://sass-lang.com/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" height="50">
        </a>
</p>

## :thinking: What's Lucast?

**Lucast** is a free screen-recording application for Windows, macOS, and Linux. Capture how you work, how you play, how you do anything, and share it with the world in a simple way!

## :inbox_tray: Downloads

is made with Electron, which makes it possible to ship the application to different operating systems.
Download the latest release in the releases tab or below:

-   :window: **Windows** — [**Download**](https://github.com/PAXANDDOS/lucast-electron/releases/download/v1.3.0/Lucast-Setup.exe)
-   :desktop_computer: **macOS** — [**Download**](https://github.com/PAXANDDOS/lucast-electron/releases/download/v1.3.0/Lucast-Installer.dmg)
-   :penguin: **Linux** — [**Download**](https://github.com/PAXANDDOS/lucast-electron/releases/download/v1.3.0/Lucast-Installer.AppImage)

Or visit the [releases page](https://github.com/PAXANDDOS/lucast-electron/releases) to download any other version and read the changelog.  
_Lucast has its own **updater**, so you won't need to check this page for new releases. Just click one button and if there is an update - Lucast will install it for you!_

## :world_map: Upcoming

I would love to make this project better, and here's what I'm planning to do:

-   **New face.** This logo is not what I wanted it to be made. I plan to make it better, to be more unique.
-   **More video formats.** This includes the installation of **FFMPEG**, which I tried to do but have faced different difficulties. FFMPEG will make videos on the output much better.
-   **More settings.** Configuring custom _resolution_ or _FPS_ is currently impossible because the application uses a built-in [MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API) to record videos from a selected screen or window.
-   **Other useful features.** Features like _screenshots_ or a _video editor_ for recorded videos may be a good idea! This list will be edited if a new feature will be in progress or something from the above releases.

## :memo: Changelog

### Update v1.3.0:

-   **Cool updater.** One simple button that will check if there is any update on the official resource. If so, it will install it for you!
-   **Audio switch**. Now you can turn your system audio on and off! Remember that the audio is not captured directly from your system and not from a specific window!
-   **You can change video and audio bitrate.** New options for both video and audio groups in the settings. Select any bitrate that you want, but remember, the most optional is the one with your screen resolution! Higher bitrate - higher image quality and bigger file size, lower quality - smaller size but an unclear image in motion.
-   **Fancy log window.** Now you can read more about the update and view the update log.
-   Fix: **No leaking.** The fixed memory leak because of the unlimited creation of event listeners.
-   Fix: **Video with no time.** Fixed metadata of the output video that was saved without "start" and "end" timestamps. This made video players unable to determine video duration and rewind it.
-   Fix: **Much more.** A lot of fixed bugs and general improvements in types, scripts, and behavior.

### Update v1.2.0:

-   **Bindings.** You can now start your recording without even opening the application! Use pre-defined keybindings or set yours. Start and end your recordings easily.
-   **Storage.** Now all your settings are saved to the configuration file, so the usage is more comfortable!
-   **Notifications.** Notifications for your actions (e.g. Starting or ending recording with a keybinding or checking for updates).
-   **System info and updater.** Your system information is displayed alongside the application information. Also, start of the Updater feature development!

### Update v1.1.0:

-   **Custom title bar.** Now there is a fancy title bar with window control buttons!
-   **Modals.** Modals for application information and settings!

### Release v1.0.0:

-   **Recorder.** Record your selected screen or window and save it to your computer!

## :paperclips: Contributing

This project is fully free-to-use and supported only by me. It's built with Electron and React. Also, it's my first project on Electron and I'm still learning it. If you would like to contribute or give me some advice - feel free to create an issue or a pull request!

## :fox_face: Have a great day!

If you like what I do, please **[check out my other projects](https://github.com/PAXANDDOS?tab=repositories)** and **[visit my website](https://paxanddos.github.io)!**
