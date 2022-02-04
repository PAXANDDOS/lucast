process.env.MODE = 'production'

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {Record<string, import('vite').InlineConfig>}
 */
const viteConfigs = {
	main: {
		configFile: 'scripts/vite.config.mjs',
		root: join(__dirname, '../packages/main'),
		build: {
			outDir: '../../dist/main',
		},
	},
	preload: {
		configFile: 'scripts/vite.config.mjs',
		root: join(__dirname, '../packages/preload'),
		build: {
			outDir: '../../dist/preload',
		},
	},
	renderer: {
		configFile: 'packages/renderer/vite.config.ts',
	},
}

const buildElectron = async () => {
	for (const [, config] of Object.entries(viteConfigs)) await build(config)
}

await buildElectron()
