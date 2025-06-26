// From https://vitejs.dev/guide/env-and-mode.html
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
