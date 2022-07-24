import react from '@vitejs/plugin-react'
import { rmSync } from 'fs'
import { join } from 'path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
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
                        sourcemap: false,
                        outDir: 'dist/electron/main',
                    },
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
    server: {
        host: pkg.env.VITE_DEV_SERVER_HOST,
        port: pkg.env.VITE_DEV_SERVER_PORT,
    },
})
