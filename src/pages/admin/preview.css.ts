import css from "@/styles/global.css?raw"

/**
 * The site's stylesheet at a fixed address, for the editor's preview pane
 * (public/admin/preview.js), so previews look exactly like the site.
 */
export const GET = () => new Response(css, { headers: { "Content-Type": "text/css; charset=utf-8" } })
