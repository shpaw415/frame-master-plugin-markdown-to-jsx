import type { FrameMasterPlugin } from "frame-master/plugin/types";
import type { MarkdownToJSXOptions } from "./types";
import MarkdownCompiler from "markdown-to-jsx";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { createStarryNight, common } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";
import { version, name } from "../package.json";

export type {
  MarkdownToJSXOptions,
  MarkdownComponents,
  SyntaxHighlightOptions,
} from "./types";

// Initialize starry-night once
let starryNightPromise: ReturnType<typeof createStarryNight> | null = null;

async function getStarryNight() {
  if (!starryNightPromise) {
    starryNightPromise = createStarryNight(common);
  }
  return starryNightPromise;
}

/**
 * Escape template literal strings for safe embedding
 */
function escapeTemplateString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

/**
 * Simple frontmatter parser (YAML-like)
 * Parses content between --- delimiters at the start of a file
 */
function parseFrontmatter(markdown: string): {
  content: string;
  data: Record<string, unknown>;
} {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = markdown.match(frontmatterRegex);

  if (!match || !match[1]) {
    return { content: markdown, data: {} };
  }

  const frontmatterStr = match[1];
  const content = markdown.slice(match[0].length);
  const data: Record<string, unknown> = {};

  // Parse simple YAML key: value pairs
  for (const line of frontmatterStr.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Parse value types
    if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value === "null") value = null;
    else if (!isNaN(Number(value)) && value !== "") value = Number(value);
    else if (
      typeof value === "string" &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }

    if (key) data[key] = value;
  }

  return { content, data };
}

/**
 * Generate the JSX component code from markdown content
 */
async function generateJSXComponent(
  markdown: string,
  options: MarkdownToJSXOptions = {}
): Promise<string> {
  const {
    wrapper = "markdown-body",
    frontmatter: enableFrontmatter = false,
    syntaxHighlight = {},
  } = options;

  // Parse frontmatter if enabled
  let content = markdown;
  let frontmatterData: Record<string, unknown> = {};

  if (enableFrontmatter) {
    const parsed = parseFrontmatter(markdown);
    content = parsed.content;
    frontmatterData = parsed.data;
  }

  // Convert markdown to JSX using markdown-to-jsx at build time
  const jsxElement = createElement(MarkdownCompiler, {
    options: { forceBlock: true },
    children: content,
  });

  // Render to static HTML markup
  let htmlContent = renderToStaticMarkup(jsxElement);

  // Apply syntax highlighting to code blocks if not disabled
  if (syntaxHighlight !== false) {
    htmlContent = await applySyntaxHighlighting(htmlContent);
  }

  // Escape for template literal
  const escapedHtml = escapeTemplateString(htmlContent);
  const escapedMarkdown = escapeTemplateString(content);

  const wrapperClass = typeof wrapper === "string" ? wrapper : "markdown-body";

  // Generate frontmatter export
  const frontmatterExport = enableFrontmatter
    ? `export const frontmatter = ${JSON.stringify(frontmatterData, null, 2)};`
    : "";

  // Generate the component code - pre-rendered HTML wrapped in a React component
  const componentCode = `
const htmlContent = \`${escapedHtml}\`;
const markdownContent = \`${escapedMarkdown}\`;
${frontmatterExport}

export default function MarkdownComponent(props) {
  return (
    <section 
      className={"${wrapperClass}" + (props.className ? " " + props.className : "")}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      {...props}
    />
  );
}

export const markdown = markdownContent;
export const html = htmlContent;
`;

  return componentCode;
}

/**
 * Apply syntax highlighting to code blocks in HTML
 */
async function applySyntaxHighlighting(html: string): Promise<string> {
  const starryNight = await getStarryNight();

  // Match <pre><code class="...language-xxx...">...</code></pre> blocks
  // markdown-to-jsx outputs class="language-xxx lang-xxx"
  const codeBlockRegex =
    /<pre><code class="[^"]*lang(?:uage)?-(\w+)[^"]*">([\s\S]*?)<\/code><\/pre>/g;

  const matches = [...html.matchAll(codeBlockRegex)];

  for (const match of matches) {
    const fullMatch = match[0];
    const lang = match[1];
    const code = match[2];

    if (!lang || !code) continue;

    // Decode HTML entities
    const decodedCode = code
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    try {
      // Find the scope for the language
      const scope = starryNight.flagToScope(lang);

      if (scope) {
        // Highlight the code
        const tree = starryNight.highlight(decodedCode, scope);
        const highlightedHtml = toHtml(tree);

        // Replace the original code block with highlighted version
        const newBlock = `<pre><code class="language-${lang} highlight">${highlightedHtml}</code></pre>`;
        html = html.replace(fullMatch, newBlock);
      }
    } catch {
      // If highlighting fails, keep original
    }
  }

  return html;
}

/**
 * markdownToJSX - Frame-Master Plugin
 *
 * Transforms Markdown files into React/JSX components on import.
 * Uses the markdown-to-jsx library to convert markdown to React elements.
 *
 * @example Basic usage
 * ```ts
 * import markdownToJSX from "frame-master-plugin-markdown-to-jsx";
 *
 * export default {
 *   plugins: [
 *     markdownToJSX(),
 *   ],
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
export default function markdownToJSX(
  options: MarkdownToJSXOptions = {}
): FrameMasterPlugin {
  const markdownPlugin: Bun.BunPlugin = {
    name: "markdown-to-jsx-loader",
    setup(build) {
      build.onLoad({ filter: /\.md$/ }, async (args) => {
        const markdown = await Bun.file(args.path).text();

        // Generate the JSX component (async for syntax highlighting)
        const jsxCode = await generateJSXComponent(markdown, options);

        return {
          contents: jsxCode,
          loader: "jsx",
        };
      });
    },
  };

  return {
    name,
    version,
    runtimePlugins: [markdownPlugin],
    build: {
      buildConfig: {
        plugins: [markdownPlugin],
      },
    },
    requirement: {
      frameMasterVersion: "^2.0.0",
      bunVersion: ">=1.2.0",
    },
  };
}
