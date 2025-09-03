import type { ManifestOptions } from 'vite-plugin-pwa'

const manifest: (id?: string) => Partial<ManifestOptions> = (id) => ({
  short_name: 'Budget Manager',
  name: 'Budget Manager',
  id,
  icons: [
    {
      src: 'favicon.ico',
      sizes: '64x64',
      type: 'image/x-icon',
    },
    {
      src: 'logo192.png',
      type: 'image/png',
      sizes: '192x192',
    },
    {
      src: 'logo512.png',
      type: 'image/png',
      sizes: '512x512',
    },
  ],
  start_url: '.',
  scope: '.',
  display_override: ['window-controls-overlay', 'standalone'],
  theme_color: '#556cd6',
})

export default manifest
