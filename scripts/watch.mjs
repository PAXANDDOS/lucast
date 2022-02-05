process.env.MODE = 'development'

import { spawn } from 'child_process'
import electron from 'electron'
import { createRequire } from 'module'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { build, createServer } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const pkg = require('../package.json')

/**
 * @type {() => Promise<import('rollup').RollupWatcher>}
 */
const watchMain = () => {
	/**
	 * @type {import('child_process').ChildProcessWithoutNullStreams | null}
	 */
	let electronProcess = null

	return build({
		configFile: 'scripts/vite.config.mjs',
		root: join(__dirname, '../packages/main'),
		build: {
			outDir: '../../dist/main',
			watch: true,
		},
		plugins: [
			{
				name: 'electron-main-watcher',
				writeBundle() {
					electronProcess && electronProcess.kill()
					electronProcess = spawn(electron, ['.'], {
						stdio: 'inherit',
						env: Object.assign(process.env, pkg.env),
					})
				},
			},
		],
	})
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
const watchPreload = (server) =>
	build({
		configFile: 'scripts/vite.config.mjs',
		root: join(__dirname, '../packages/preload'),
		build: {
			outDir: '../../dist/preload',
			watch: true,
		},
		plugins: [
			{
				name: 'electron-preload-watcher',
				writeBundle() {
					server.ws.send({ type: 'full-reload' })
				},
			},
		],
	})

const server = await createServer({
	configFile: 'packages/renderer/vite.config.ts',
})

await server.listen()
await watchPreload(server)
await watchMain()
