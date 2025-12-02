import type { FrameMasterConfig } from "frame-master/server/types";
import markdownToJSX from "frame-master-plugin-markdown-to-jsx";
import ReactToHtml from "frame-master-plugin-react-to-html";
import ApplyReact from "frame-master-plugin-apply-react/plugin";

export default {
  HTTPServer: {
    port: 3002,
  },
  plugins: [
    markdownToJSX({
      frontmatter: true,
    }),
    ReactToHtml({
      srcDir: "src",
      outDir: ".frame-master/build",
      shellPath: "src/shell.tsx",
    }),
    ApplyReact({
      route: "src",
      style: "nextjs",
    }),
  ],
} satisfies FrameMasterConfig;
