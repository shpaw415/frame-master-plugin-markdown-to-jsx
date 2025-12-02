// Module declarations for CSS imports
declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.md" {
  const MarkdownComponent: React.ComponentType<{
    options?: Record<string, unknown>;
    [key: string]: unknown;
  }>;
  export default MarkdownComponent;
  export const markdown: string;
  export const frontmatter: Record<string, unknown>;
}
