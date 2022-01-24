import { builtinModules } from 'module'
import { join } from 'path'
import { defineConfig } from 'vite'
import pkg from '../package.json'

export default defineConfig({
	mode: process.env.NODE_ENV,
	root: join(__dirname, '../packages/main'),
	build: {
		outDir: '../../dist/main',
		lib: {
			entry: 'index.ts',
			formats: ['cjs'],
		},
		minify: process.env.NODE_ENV === 'production',
		emptyOutDir: true,
		rollupOptions: {
			external: [
				'electron',
				...builtinModules,
				...Object.keys((pkg as Record<string, any>).dependencies || {}),
			],
			output: {
				entryFileNames: '[name].cjs',
			},
		},
	},
})
