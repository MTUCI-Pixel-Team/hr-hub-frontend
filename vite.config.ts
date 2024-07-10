import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react(), sentryVitePlugin({
        org: "mtuci-v2",
        project: "hrhub"
    })],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    server: {
        host: true,
    },

    build: {
        sourcemap: true
    }
})