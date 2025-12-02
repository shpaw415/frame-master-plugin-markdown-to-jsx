// Test the markdown-to-jsx plugin
// The plugin is registered via frame-master.config.ts

import Article from "./test.md";

export default function Page() {
  return (
    <div>
      <Article />
    </div>
  );
}
