import react from '@vitejs/plugin-react'
import { rmSync } from 'fs'
import { join } from 'path'
import { defineConfig } from 'vite'
import electron from 'vite-electron-plugin'

rmSync(join(__dirname, 'dist-electron'), { recursive: true, force: true })

export default defineConfig({
    resolve: {
        alias: {
            '@': join(__dirname, 'src/components'),
            icons: join(__dirname, 'src/assets/icons'),
            styles: join(__dirname, 'src/assets/styles'),
            '#': join(__dirname, 'src'),
        },
    },
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
    plugins: [
        react(),
        electron({
            include: ['electron', 'preload'],
            transformOptions: {
                sourcemap: !!process.env.VSCODE_DEBUG,
            },
        }),
    ],
    clearScreen: false,
})
