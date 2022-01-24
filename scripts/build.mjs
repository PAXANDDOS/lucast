process.env.NODE_ENV = 'production'

import chalk from 'chalk'
import { build as viteBuild } from 'vite'

const TAG = chalk.bgBlue('[build.mjs]')

const config = {
	main: 'config/vite.main.ts',
	preload: 'config/vite.preload.ts',
	renderer: 'config/vite.renderer.ts',
}

async function buildElectron() {
	for (const [name, configPath] of Object.entries(config)) {
		console.group(TAG, name)
		await viteBuild({
			configFile: configPath,
			mode: process.env.NODE_ENV,
		})
		console.groupEnd()
		console.log()
	}
}

await buildElectron()
