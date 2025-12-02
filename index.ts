/**
 * frame-master-plugin-markdown-to-jsx
 *
 * A Frame-Master plugin that transforms Markdown files into React/JSX components.
 * Uses markdown-to-jsx for converting markdown to React elements at runtime.
 *
 * @example Basic usage
 * ```ts
 * import markdownToJSX from "frame-master-plugin-markdown-to-jsx";
 *
 * export default {
 *   plugins: [markdownToJSX()],
 * };
 * ```
 *
 * @example Importing markdown as a component
 * ```tsx
 * import Article from "./article.md";
 *
 * function Page() {
 *   return <Article />;
 * }
 * ```
 */

export { default } from "./src/index";
export type {
  MarkdownToJSXOptions,
  MarkdownComponents,
  SyntaxHighlightOptions,
} from "./src/types";
