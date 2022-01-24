import react from '@vitejs/plugin-react'
import { builtinModules } from 'module'
import { join } from 'path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import resolve from 'vite-plugin-resolve'
import pkg from '../package.json'

export default defineConfig({
	mode: process.env.NODE_ENV,
	root: join(__dirname, '../packages/renderer'),
	plugins: [react(), resolveElectron()],
	base: './',
	build: {
		emptyOutDir: true,
		outDir: '../../dist/renderer',
	},
	resolve: {
		alias: {
			'@': join(__dirname, '../packages/renderer/src'),
			packages: join(__dirname, '../packages'),
		},
	},
	server: {
		host: pkg.env.HOST,
		port: pkg.env.PORT,
	},
})

export function resolveElectron(
	dict: Parameters<typeof resolve>[0] = {}
): Plugin[] {
	const builtins = builtinModules.filter((t) => !t.startsWith('_'))

	return [
		{
			name: 'vite-plugin-electron-config',
			config(config) {
				if (!config.optimizeDeps) config.optimizeDeps = {}
				if (!config.optimizeDeps.exclude)
					config.optimizeDeps.exclude = []

				config.optimizeDeps.exclude.push('electron', ...builtins)
			},
		},
		resolve({
			electron: electronExport(),
			...builtinModulesExport(builtins),
			...dict,
		}),
	]

	function electronExport() {
		return `
			/**
			 * All exports module see https://www.electronjs.org -> API -> Renderer Process Modules
			 */
			const electron = require("electron");
			const {
				clipboard,
				nativeImage,
				shell,
				contextBridge,
				crashReporter,
				ipcRenderer,
				webFrame,
				desktopCapturer,
				deprecate,
			} = electron;

			export {
				electron as default,
				clipboard,
				nativeImage,
				shell,
				contextBridge,
				crashReporter,
				ipcRenderer,
				webFrame,
				desktopCapturer,
				deprecate,
			}
			`
	}

	function builtinModulesExport(modules: string[]) {
		return modules
			.map((moduleId) => {
				const nodeModule = require(moduleId)
				const requireModule = `const __builtinModule = require("${moduleId}");`
				const exportDefault = 'export default __builtinModule'
				const exportMembers =
					Object.keys(nodeModule)
						.map(
							(attr) =>
								`export const ${attr} = __builtinModule.${attr}`
						)
						.join(';\n') + ';'
				const nodeModuleCode = `
					${requireModule}

					${exportDefault}

					${exportMembers}
					`
				return { [moduleId]: nodeModuleCode }
			})
			.reduce((memo, item) => Object.assign(memo, item), {})
	}
}
