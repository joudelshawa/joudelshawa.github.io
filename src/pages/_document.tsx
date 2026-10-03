import { Html, Head, Main, NextScript } from "next/document"

// Runs before first paint. Marks <html> when her greeting should play: on the
// home page itself (no section link), once per session, without reduced motion.
// CSS shows the inbox and hides her bubbles only under that mark, so without JS
// nothing is ever hidden.
const arrivalScript = `try{var d=document.documentElement,s=!1;try{s=sessionStorage.getItem("arrived")==="1"}catch(e){}if(!s&&location.pathname==="/"&&!location.hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-arrive","")}catch(e){}`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: arrivalScript }} />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="color-scheme" content="light dark" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
