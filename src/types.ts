import type { FilterPattern } from '@rollup/pluginutils'
import type MarkdownIt from 'markdown-it'

export interface Options {
  markdownItSetup?: (md: MarkdownIt) => Promise<void> | Promise<void>
  /**
   * Custome tranformations apply before and after the markdown transformation.
   */
  transgorms?: {
    before?: (code: string, id: string) => string
    after?: (code: string, id: string) => string
  }
  /**
   * Options passed to Markdown-It
   */
  markdownItOptions?: MarkdownIt.Options
  include?: FilterPattern
  exclude?: FilterPattern
}

export interface MarkdownEnv {
  id: string
}
