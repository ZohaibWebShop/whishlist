import { defineConfig } from 'vite';
import path from 'path';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

const ASSET_URL = process.env.ASSET_URL || '/build/';


export default defineConfig({
    server: {
        origin: 'https://app.wdspreview.com',
    },
    plugins: [
        react(),
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
    ],
    resolve:{
        alias:{
            '~': path.resolve(__dirname, 'node_modules'),
            '@components': path.resolve(__dirname, 'resources/js/components'),
            '@hook': path.resolve(__dirname, 'resources/js/hook'),
            '@pages': path.resolve(__dirname, 'resources/js/Pages'),
            '@context': path.resolve(__dirname, 'resources/js/context')
        }
    },
    build:{
        chunkSizeWarningLimit:1000
    },
    optimizeDeps:{
        include: ['esm-dep > cjs-dep'],
    }
});
