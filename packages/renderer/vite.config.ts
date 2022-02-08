import react from '@vitejs/plugin-react'
import { builtinModules } from 'module'
import { join } from 'path'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import resolve from 'vite-plugin-resolve'
import pkg from '../../package.json'

export default defineConfig({
	mode: process.env.NODE_ENV,
	root: __dirname,
	plugins: [react(), resolveElectron()],
	base: './',
	build: {
		emptyOutDir: true,
		outDir: '../../dist/renderer',
	},
	resolve: {
		alias: {
			'@': join(__dirname, 'src'),
			packages: join(__dirname, '../../packages'),
		},
	},
	server: {
		port: pkg.env.PORT,
	},
})

export function resolveElectron(resolves: Parameters<typeof resolve>[0] = {}): Plugin {
	const builtins = builtinModules.filter(t => !t.startsWith('_'))

	return resolve({
		electron: electronExport(),
		...builtinModulesExport(builtins),
		...resolves,
	})

	function electronExport() {
		return `
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
			.map(moduleId => {
				const nodeModule = require(moduleId)
				const requireModule = `const M = require("${moduleId}");`
				const exportDefault = 'export default M;'
				const exportMembers =
					Object.keys(nodeModule)
						.map(attr => `export const ${attr} = M.${attr}`)
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
