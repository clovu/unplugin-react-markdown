/**
 * <p>
 * markdown-it
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2024-08-22 16:30
 */
import MarkdownIt from 'markdown-it'

import type { TransformResult } from 'unplugin'
import { transform } from 'esbuild'

import { JsxifyHtml } from 'jsxify-html'
import matter from 'gray-matter'
import type { MarkdownEnv, Options } from '../types'

export async function createMarkdown(options: Options) {
  const markdown = MarkdownIt({
    html: true,
    ...options.markdownItOptions,
  })

  const jsxifier = new JsxifyHtml({
    xml: true,
    preservePreTags: true,
  })

  await options.markdownItSetup?.(markdown)

  return async (id: string, raw: string): Promise<TransformResult> => {
    const { transgorms } = options

    raw = raw.trim()
    raw = transgorms?.before?.(raw, id) ?? raw

    const env: MarkdownEnv = { id }
    const { content, data } = matter(raw)
    let html = markdown.render(content, env)

    html = jsxifier.convert(html) ?? ''

    raw = transgorms?.after?.(html, id) ?? raw

    const imports = data.imports ?? ''
    delete data.imports

    const code = [
      `import React from 'react'`,
      imports,
      `export default () =>`,
      html,
      `export const forntmatter = ${JSON.stringify(data)}`,
    ].join('\n')

    const { code: result } = await transform(code, {
      loader: 'tsx',
      jsxImportSource: 'react',
    })

    return { code: result, map: { mappings: '' } }
  }
}
