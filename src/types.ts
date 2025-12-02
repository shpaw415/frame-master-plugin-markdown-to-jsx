import type { ComponentType, ReactNode } from "react";

/**
 * Custom component overrides for markdown elements
 */
export interface MarkdownComponents {
  /**
   * Override for heading elements (h1-h6)
   */
  h1?: ComponentType<{ children?: ReactNode }>;
  h2?: ComponentType<{ children?: ReactNode }>;
  h3?: ComponentType<{ children?: ReactNode }>;
  h4?: ComponentType<{ children?: ReactNode }>;
  h5?: ComponentType<{ children?: ReactNode }>;
  h6?: ComponentType<{ children?: ReactNode }>;

  /**
   * Override for paragraph element
   */
  p?: ComponentType<{ children?: ReactNode }>;

  /**
   * Override for anchor/link element
   */
  a?: ComponentType<{ href?: string; children?: ReactNode }>;

  /**
   * Override for image element
   */
  img?: ComponentType<{ src?: string; alt?: string }>;

  /**
   * Override for code blocks
   */
  pre?: ComponentType<{ children?: ReactNode }>;
  code?: ComponentType<{ className?: string; children?: ReactNode }>;

  /**
   * Override for lists
   */
  ul?: ComponentType<{ children?: ReactNode }>;
  ol?: ComponentType<{ children?: ReactNode }>;
  li?: ComponentType<{ children?: ReactNode }>;

  /**
   * Override for blockquote
   */
  blockquote?: ComponentType<{ children?: ReactNode }>;

  /**
   * Override for horizontal rule
   */
  hr?: ComponentType<Record<string, never>>;

  /**
   * Override for table elements
   */
  table?: ComponentType<{ children?: ReactNode }>;
  thead?: ComponentType<{ children?: ReactNode }>;
  tbody?: ComponentType<{ children?: ReactNode }>;
  tr?: ComponentType<{ children?: ReactNode }>;
  th?: ComponentType<{ children?: ReactNode }>;
  td?: ComponentType<{ children?: ReactNode }>;

  /**
   * Any additional custom components
   */
  [key: string]: ComponentType<any> | undefined;
}

/**
 * Options for syntax highlighting in code blocks
 */
export interface SyntaxHighlightOptions {
  /**
   * Enable syntax highlighting
   * @default true
   */
  enabled?: boolean;

  /**
   * Theme for syntax highlighting
   */
  theme?: "light" | "dark" | "both" | string;
}

/**
 * Main plugin options
 */
export interface MarkdownToJSXOptions {
  /**
   * Custom component overrides for markdown elements
   */
  components?: MarkdownComponents;

  /**
   * Options for syntax highlighting in code blocks
   */
  syntaxHighlight?: SyntaxHighlightOptions | false;

  /**
   * Wrapper component or class name for the markdown content
   * @default "markdown-body"
   */
  wrapper?: string | ComponentType<{ children?: ReactNode }>;

  /**
   * Whether to include frontmatter parsing
   * @default false
   */
  frontmatter?: boolean;

  /**
   * Additional props to pass to the generated component
   */
  additionalProps?: Record<string, unknown>;
}
