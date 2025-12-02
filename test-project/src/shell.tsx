export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Shell Layout</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css"
        />
      </head>
      <body id="root">{children}</body>
    </html>
  );
}
