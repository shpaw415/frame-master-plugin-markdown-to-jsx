# frame-master-plugin-markdown-to-jsx

A **Frame-Master** plugin that transforms Markdown files into React/JSX components on import. Uses [markdown-to-jsx](https://github.com/quantizor/markdown-to-jsx) for converting markdown to React elements with **build-time syntax highlighting**.

## Features

- 📝 **Import Markdown as React Components**: Directly import `.md` files as React components.
- ⚛️ **React Native**: Full React component output with proper JSX.
- 🎨 **Syntax Highlighting**: GitHub-style code highlighting at build time using [@wooorm/starry-night](https://github.com/wooorm/starry-night).
- ⚡ **Bun Native**: Optimized for Bun's runtime and build system.

## Installation

```bash
bun add frame-master-plugin-markdown-to-jsx
```

## Usage

Add the plugin to your `frame-master.config.ts`:

```typescript
import type { FrameMasterConfig } from "frame-master/server/types";
import markdownToJSX from "frame-master-plugin-markdown-to-jsx";

const config: FrameMasterConfig = {
  HTTPServer: { port: 3000 },
  plugins: [markdownToJSX()],
};

export default config;
```

### Importing Markdown as a Component

In your React application:

```tsx
import Article from "./posts/hello-world.md";

function Page() {
  return (
    <main>
      <Article />
    </main>
  );
}
```

### Accessing Raw Markdown and HTML

You can access both the raw markdown and pre-rendered HTML:

```tsx
import Article, { markdown, html } from "./posts/hello-world.md";

console.log(markdown); // Raw markdown string
console.log(html); // Pre-rendered HTML string
```

### Custom Component Overrides

Pass custom options to override markdown elements:

```tsx
import Article from "./article.md";

function Page() {
  return (
    <Article
      options={{
        overrides: {
          h1: {
            component: (props) => <h1 className="title" {...props} />,
          },
          a: {
            component: (props) => <a target="_blank" {...props} />,
          },
        },
      }}
    />
  );
}
```

## Configuration Options

| Option            | Type              | Description                                                     |
| ----------------- | ----------------- | --------------------------------------------------------------- |
| `wrapper`         | `string`          | CSS class for the wrapper element (default: `"markdown-body"`). |
| `syntaxHighlight` | `object \| false` | Syntax highlighting config. Set to `false` to disable.          |
| `frontmatter`     | `boolean`         | Enable frontmatter parsing (default: `false`).                  |

## Syntax Highlighting

Code blocks are automatically highlighted at build time using GitHub's syntax highlighting. To style the highlighted code, add the starry-night CSS to your project:

### Option 1: Use CDN

Add to your `head.html` or layout:

```html
<link rel="stylesheet" href="MarkdownStyle.css" />
```

### Option 2: Use github-markdown-css

For full GitHub-style markdown (including code blocks):

```bash
bun add github-markdown-css
```

```tsx
import "github-markdown-css/github-markdown.css";

<Article className="markdown-body" />;
```

### Disable Syntax Highlighting

```typescript
markdownToJSX({
  syntaxHighlight: false,
});
```

## TypeScript Support

The plugin includes full TypeScript support. Import types as needed:

```typescript
import type {
  MarkdownToJSXOptions,
  MarkdownComponents,
} from "frame-master-plugin-markdown-to-jsx";
```

### Module Declaration for `.md` Files

Add the following to your `.frame-master/frame-master-custom-type.d.ts` to enable TypeScript support for markdown imports:

```typescript
import type { ComponentType } from "react";

declare module "*.md" {
  const MarkdownComponent: ComponentType<{
    className?: string;
    [key: string]: unknown;
  }>;
  export default MarkdownComponent;
  export const markdown: string;
  export const html: string;
  export const frontmatter: Record<string, unknown>;
}
```

## License

MIT
