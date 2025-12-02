import {
  require_jsx_dev_runtime
} from "./../node_modules/react/jsx-dev-runtime.js";
import"./../node_modules/react/cjs/react-jsx-dev-runtime.development.js";
import"./../node_modules/react/index.js";
import {
  __toESM
} from "./../node_modules/react/cjs/react.development.js";

// __ORIGINAL__:/home/shpaw415/frame-master-plugins/markdown-to-jsx/test-project/src/_shell_.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function Shell({ children }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("html", {
    children: [
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("head", {
        children: [
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("title", {
            children: "Shell Layout"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime.jsxDEV("link", {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime.jsxDEV("body", {
        id: "root",
        children
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/test.md
var jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
var htmlContent = `<div><h1 id="hello-world">Hello World</h1><p>This is a <strong>test markdown</strong> file for the <code>markdown-to-jsx</code> plugin.</p><h2 id="features">Features</h2><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><h2 id="code-example">Code Example</h2><pre><code class="language-javascript highlight"><span class="pl-k">function</span> <span class="pl-en">greet</span>(<span class="pl-smi">name</span>) {
  <span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">\`</span>Hello, <span class="pl-pse"><span class="pl-s1">\${</span></span><span class="pl-s1">name</span><span class="pl-pse"><span class="pl-s1">}</span></span>!<span class="pl-pds">\`</span></span>);
}</code></pre><h2 id="links">Links</h2><p>Check out <a href="https://github.com/shpaw415/frame-master">Frame-Master</a> for more information.</p><blockquote><p>This is a blockquote to test styling.</p></blockquote><table><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>Alice</td><td>30</td></tr><tr><td>Bob</td><td>25</td></tr></tbody></table></div>`;
function MarkdownComponent(props) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("section", {
    className: "markdown-body" + (props.className ? " " + props.className : ""),
    dangerouslySetInnerHTML: { __html: htmlContent },
    ...props
  }, undefined, false, undefined, this);
}

// __ORIGINAL__:/home/shpaw415/frame-master-plugins/markdown-to-jsx/test-project/src/_index_.tsx
var jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
function Page() {
  return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("div", {
    children: /* @__PURE__ */ jsx_dev_runtime3.jsxDEV(MarkdownComponent, {}, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}

// client-routes:client-routes
var _ROUTES_ = { "/shell": Shell, "/": Page };
var client_routes_default = _ROUTES_;
export {
  client_routes_default as default
};

export { client_routes_default };

//# debugId=A40F75BEEF07FFD064756E2164756E21
//# sourceMappingURL=./routes/client:routes.js.map
