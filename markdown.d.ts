import type { ComponentType } from "react";

declare module "*.md" {
  /**
   * The React component generated from the markdown file.
   * Renders pre-compiled HTML content.
   */
  const MarkdownComponent: ComponentType<{
    /** Additional CSS class name */
    className?: string;
    /** Additional props */
    [key: string]: unknown;
  }>;
  export default MarkdownComponent;

  /**
   * The raw markdown content as a string.
   */
  export const markdown: string;

  /**
   * The pre-rendered HTML content.
   */
  export const html: string;

  /**
   * Parsed frontmatter data from the markdown file.
   * Only available when frontmatter option is enabled.
   */
  export const frontmatter: Record<string, unknown>;
}
