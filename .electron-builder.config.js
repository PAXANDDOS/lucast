/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
	appId: 'com.paxanddos.screencast',
	productName: 'Screencast: Screen Recorder',
	copyright: 'Copyright © 2022 ${author}',
	asar: true,
	directories: {
		output: 'release/${version}',
		buildResources: 'build',
	},
	files: ['dist'],
	win: {
		target: [
			{
				target: 'nsis',
				arch: ['x64'],
			},
		],
		artifactName: '${productName}-${arch}.${ext}',
	},
	nsis: {
		oneClick: false,
		perMachine: false,
		allowToChangeInstallationDirectory: true,
		deleteAppDataOnUninstall: false,
		artifactName: '${productName} Setup.${ext}',
		createDesktopShortcut: true,
		createStartMenuShortcut: true,
	},
	mac: {
		artifactName: '${productName}.${ext}',
		target: ['dmg'],
		category: 'public.app-category.utilities',
	},
	dmg: {
		artifactName: '${productName} Installer.${ext}',
		title: '${productName} ${version}',
	},
}
