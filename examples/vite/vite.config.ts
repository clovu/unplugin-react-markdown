import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'
import Markdown from 'unplugin-react-markdown/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({include: [/\.md$/]}),
    Markdown({}),
    Inspect()
  ]
})
