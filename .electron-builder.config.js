/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
	appId: 'com.paxanddos.lucast',
	productName: 'Lucast',
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
	},
	nsis: {
		oneClick: false,
		perMachine: false,
		allowToChangeInstallationDirectory: true,
		deleteAppDataOnUninstall: false,
		artifactName: '${productName}-Setup.${ext}',
		createDesktopShortcut: true,
		createStartMenuShortcut: true,
		runAfterFinish: true,
	},
	mac: {
		identity: 'PAXANDDOS Individual Co.',
		extendInfo: {
			ElectronTeamID: 'paxanddos',
			'com.apple.developer.team-identifier': 'paxanddos',
			'com.apple.application-identifier': 'paxanddos.github.io',
			'Bundle name': '${productName}',
			LSHasLocalizedDisplayName: true,
		},
		electronLanguages: ['en'],
		target: ['dmg'],
		category: 'public.app-category.utilities',
	},
	dmg: {
		artifactName: '${productName}-Installer.${ext}',
		title: '${productName} ${version}',
		sign: false,
	},
	linux: {
		target: ['AppImage'],
		category: 'Utility',
	},
	appImage: {
		artifactName: '${productName}-Installer.${ext}',
	},
}
