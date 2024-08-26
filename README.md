# unplugin-react-markdown

[![NPM version](https://img.shields.io/npm/v/unplugin-react-markdown?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-react-markdown)

Compile Markdown to React component.

- 📚 Use Markdown as React components.
- 💚 Use React components in Markdown.
- 🔌 Supports Vite, Webpack and more, powered by unplugin.

## Install

```bash
pnpm add unplugin-react-markdown
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Markdown from 'unplugin-react-markdown/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ include: [/\.md$/] }),
    Markdown({}),
  ]
})
```

Example: [`examples/vite`](./examples/vite/)

<br></details>

<details>
<summary>NextJS/Webpack</summary><br>

```ts
// next.config.mjs
// @ts-check
import Markdown from 'unplugin-react-markdown/webpack'
import Shiki from '@shikijs/markdown-it'

function parseMetaString(_metaString, _code, lang) {
  return {
    dataLanguage: lang,
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(Markdown({
      markdownItSetup: async (md) => {
        md.use(await Shiki({
          themes: {
            light: 'vitesse-light',
            dark: 'nord',
          },
          theme: {
            colorReplacements: {
              '#2e3440ff': '#282a2d',
            },
          },
          meta: {
            dataLanguage: 'java',
          },
          parseMetaString,
        }))
      },
    }))
    return config
  },
}

export default nextConfig
```

Example: [`examples/nextjs`](./examples/nextjs/)

<br></details>

## Import Markdown as React components

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Home, { forntmatter } from './index.md'

console.log(forntmatter)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
```

## Use React Components inside Markdown

```markdown
---
title: Hello World
imports: |
  import App from './App'
---

# Hello World

use react component

<App />
```
