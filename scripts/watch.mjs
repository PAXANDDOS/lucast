import { spawn } from 'child_process'
import electron from 'electron'
import { build, createServer } from 'vite'

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
const watchMain = server => {
	/**
	 * @type {import('child_process').ChildProcessWithoutNullStreams | null}
	 */
	let electronProcess = null
	const address = server.httpServer.address()
	const env = Object.assign(process.env, {
		VITE_DEV_SERVER_HOST: address.address,
		VITE_DEV_SERVER_PORT: address.port,
	})

	return build({
		configFile: 'packages/main/vite.config.ts',
		mode: 'development',
		plugins: [
			{
				name: 'electron-main-watcher',
				writeBundle() {
					electronProcess && electronProcess.kill()
					electronProcess = spawn(electron, ['.'], {
						stdio: 'inherit',
						env,
					})
				},
			},
		],
		build: {
			watch: true,
		},
	})
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
const watchPreload = server => {
	return build({
		configFile: 'packages/preload/vite.config.ts',
		mode: 'development',
		plugins: [
			{
				name: 'electron-preload-watcher',
				writeBundle() {
					server.ws.send({ type: 'full-reload' })
				},
			},
		],
		build: {
			watch: true,
		},
	})
}

const server = await createServer({
	configFile: 'packages/renderer/vite.config.ts',
})

await server.listen()
await watchPreload(server)
await watchMain(server)
