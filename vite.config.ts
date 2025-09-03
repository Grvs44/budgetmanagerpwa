import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import license from 'rollup-plugin-license'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import jsconfigPaths from 'vite-jsconfig-paths'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'

dotenv.config()
const base = process.env.VITE_BASE_URL

export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths(),
    VitePWA({
      injectRegister: 'inline',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.ts',
      manifest: false,
    }),
    createHtmlPlugin({ minify: true }),
  ],
  base: base || './',
  server: {
    open: base,
    port: 3000,
    proxy: {
      [process.env.VITE_API_URL as any]: {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
    assetsDir: 'static',
    rollupOptions: {
      output: {
        manualChunks: {
          e: ['@emotion/react', '@emotion/styled'],
          i: ['@mui/icons-material'],
          m: ['@mui/material'],
          p: ['@mui/x-date-pickers'],
          d: ['dayjs'],
          c: ['js-cookie'],
          r: ['react', 'react-dom'],
          x: ['react-redux'],
          o: ['react-router-dom'],
        },
      },
      plugins: [
        license({
          banner: {
            content: '/*! licenses: licenses.txt */',
          },
          thirdParty: {
            includeSelf: true,
            output: { file: 'build/licenses.txt' },
          },
        }) as Plugin,
      ],
    },
  },
})
