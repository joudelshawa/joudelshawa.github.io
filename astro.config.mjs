import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://joud.shawa.dev",
  // /projects/hermes-clinical-nlp.html, served at /projects/hermes-clinical-nlp,
  // the same URLs the Next.js build had.
  build: { format: "file" },
  trailingSlash: "never",
  devToolbar: { enabled: false },
})
