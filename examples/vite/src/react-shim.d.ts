declare module '*.md' {
  export const MarkdownComponent: () => JSX.Element

  /**
   * The forntmatter of the markdown file metadata
   */
  export const forntmatter: {
    /**
     * The title of the markdown file
     */
    title: string
  }

  export default MarkdownComponent
}
