import type { UnpluginFactory } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { createUnplugin } from 'unplugin'

import type { Options } from './types'
import { createMarkdown } from './core/markdown'

const cssIdRE = /\.(css|postcss|sass|scss|less|stylus|styl)($|\?)/

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options = {}) => {
  const filter = createFilter(
    options?.include || /\.md$|\.md?react$/,
    options?.exclude || cssIdRE,
  )

  const handler = createMarkdown(options)

  return {
    name: 'unplugin-react-markdown',
    enforce: 'pre',
    transformInclude(id) {
      return filter(id)
    },
    async transform(code, id) {
      return (await handler)(id, code)
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
