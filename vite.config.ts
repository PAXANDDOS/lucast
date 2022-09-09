import react from '@vitejs/plugin-react'
import { rmSync } from 'fs'
import { join } from 'path'
import { defineConfig } from 'vite'
import electron, { onstart } from 'vite-plugin-electron'
import pkg from './package.json'

rmSync(join(__dirname, 'dist'), { recursive: true, force: true })

export default defineConfig({
    resolve: {
        alias: {
            '@': join(__dirname, 'src/components'),
            icons: join(__dirname, 'src/assets/icons'),
            styles: join(__dirname, 'src/assets/styles'),
            '#': join(__dirname, 'src'),
        },
    },
    plugins: [
        react(),
        electron({
            main: {
                entry: 'electron/main/index.ts',
                vite: {
                    build: {
                        sourcemap: true,
                        outDir: 'dist/electron/main',
                    },
                    plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
                },
            },
            preload: {
                input: {
                    index: join(__dirname, 'electron/preload/index.ts'),
                },
                vite: {
                    build: {
                        sourcemap: 'inline',
                        outDir: 'dist/electron/preload',
                    },
                },
            },
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData:
                    '@import "src/assets/styles/variables"; \
                    @import "src/assets/styles/mixins"; \
                    @import "src/assets/styles/animations";',
            },
        },
    },
    server: process.env.VSCODE_DEBUG
        ? {
              host: pkg.debug.env.VITE_DEV_SERVER_HOSTNAME,
              port: pkg.debug.env.VITE_DEV_SERVER_PORT,
          }
        : undefined,
})
