/* global CMS, h, createClass */
/*
 * Editor previews that look like the site. Each entry is rendered with the
 * site's own markup and stylesheet (/admin/preview.css), so the preview pane
 * shows the actual bubble, link preview or document a visitor will see.
 * Markup mirrors src/components/*.astro; keep them in step.
 */
CMS.registerPreviewStyle("/admin/preview.css")
CMS.registerPreviewStyle(
  // The site leaves room for its floating header; the preview doesn't need it.
  ".thread, .article { padding-top: 24px; } .thread { padding-bottom: 24px; } body { min-height: 100vh; }",
  { raw: true },
)

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const tailPath =
  "M8.9 -3.2 C9.6 -2.3 10.3 -1.2 10.3 0.4 C10.3 2.2 9.6 3.6 8.6 4.9 C8 5.7 7.9 6.8 8.4 7.3 C8.8 7.7 9.6 7.5 10.4 6.9 C13.5 4.9 18 2 22.6 0 L22.6 -3.2 Z"
const trailingEmoji =
  /\s*((?:\p{Regional_Indicator}{2}|\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?(?:‍\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?)*))\s*$/u

/** Plain values from the editor's (Immutable) entry data. */
const plain = (value) => (value && typeof value.toJS === "function" ? value.toJS() : value)
const list = (value) => (Array.isArray(plain(value)) ? plain(value) : [])
const field = (entry, name) => plain(entry.getIn(["data", name]))
const assetUrl = (getAsset, path) => {
  if (!path) return ""
  const asset = getAsset(path)
  return (asset && (asset.url || asset.toString())) || path
}

const monthLabel = (iso) => {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(iso || "")) return null
  const [year, month] = iso.split("-")
  return { month: months[Number(month) - 1], year, iso }
}

const splitReaction = (raw) => {
  const text = (raw || "").trim()
  const match = text.match(trailingEmoji)
  return match ? { text: text.slice(0, match.index).trimEnd(), reaction: match[1] } : { text, reaction: null }
}

const Tail = () =>
  h("svg", { className: "tail", viewBox: "0 -4 24 12", "aria-hidden": "true" }, h("path", { d: tailPath }))

const Chevron = () =>
  h("svg", { className: "chevron", viewBox: "0 0 8 14", "aria-hidden": "true" }, h("path", { d: "M1.5 1.5 6.5 7l-5 5.5" }))

const Bubble = ({ key, text, tail = false, reaction = null, side = "her" }) =>
  h(
    "li",
    { key, className: `row row-${side}${reaction ? " has-reaction" : ""}` },
    h(
      "div",
      { className: `bubble${side === "you" ? " bubble-you" : ""}` },
      text,
      reaction ? " " : null,
      reaction ? h("span", { className: "reaction" }, reaction) : null,
      tail ? h(Tail) : null,
    ),
  )

const Separator = ({ start, end }) => {
  if (!start) return h("p", { className: "separator" }, "Add a month, like 2025-11")
  const sameYear = end && end.year === start.year
  return h(
    "p",
    { className: "separator" },
    h("time", null, h("b", null, start.month), sameYear ? null : ` ${start.year}`),
    end ? " – " : null,
    end ? h("time", null, h("b", null, end.month), ` ${end.year}`) : null,
  )
}

const Thread = (...children) => h("main", { className: "thread" }, ...children)
const SectionLabel = (text) => h("h2", { className: "separator section-label" }, text)

/* ---------- Milestones ---------- */

const MilestonePreview = createClass({
  render() {
    const { entry, getAsset } = this.props
    const photos = list(field(entry, "photos"))
    const { text, reaction } = splitReaction(field(entry, "text"))
    const start = monthLabel(field(entry, "start"))
    const end = monthLabel(field(entry, "end"))
    return Thread(
      h(
        "ol",
        { className: "history" },
        h(
          "li",
          null,
          h(Separator, { start, end }),
          h(
            "ol",
            { className: "run" },
            Bubble({ key: "text", text: text || "Write the milestone…", reaction, tail: photos.length === 0 }),
            ...photos.map((photo, i) =>
              h(
                "li",
                { key: `photo-${i}`, className: "row row-her" },
                h(
                  "span",
                  { className: "bubble bubble-flush photo" },
                  photo && photo.image
                    ? h("img", { src: assetUrl(getAsset, photo.image), alt: photo.alt || "" })
                    : h("span", { className: "separator" }, "Choose a photo"),
                ),
              ),
            ),
          ),
        ),
      ),
    )
  },
})

/* ---------- Greeting ---------- */

const IntroPreview = createClass({
  render() {
    const { entry } = this.props
    const messages = list(field(entry, "messages")).filter(Boolean)
    const latest = field(entry, "latest")
    const greeting = latest ? [...messages.slice(0, -1), latest, ...messages.slice(-1)] : messages
    return Thread(
      h(
        "ol",
        { className: "run" },
        ...greeting.map((message, i) => Bubble({ key: i, text: message, tail: i === greeting.length - 1 })),
      ),
      h(
        "nav",
        { className: "replies" },
        ...["Projects?", "Papers?", "Milestones?", "Contact?"].map((reply) =>
          h("span", { key: reply, className: "reply" }, reply),
        ),
      ),
    )
  },
})

/* ---------- Profile & contact ---------- */

const handle = (url) => (url || "").replace(/\/+$/, "").split("/").pop()

const ProfilePreview = createClass({
  render() {
    const { entry, getAsset } = this.props
    const photo = assetUrl(getAsset, field(entry, "photo"))
    const rows = [
      ["Email", field(entry, "email"), true],
      ["LinkedIn", handle(field(entry, "linkedin"))],
      ["GitHub", handle(field(entry, "github"))],
      ["Résumé", "PDF"],
    ]
    return Thread(
      h(
        "div",
        { style: { display: "flex", justifyContent: "center", marginBottom: "8px" } },
        h(
          "span",
          { className: "header-link" },
          photo ? h("img", { className: "header-avatar", src: photo, alt: "" }) : null,
          h("span", { className: "glass header-name" }, field(entry, "shortName"), h(Chevron)),
        ),
      ),
      SectionLabel("Contact"),
      h(
        "ol",
        { className: "run" },
        Bubble({ key: "line", text: field(entry, "contactLine") }),
        h(
          "li",
          { key: "card", className: "row row-her" },
          h(
            "div",
            { className: "bubble bubble-flush card" },
            h(
              "div",
              { className: "card-head" },
              photo ? h("img", { className: "card-avatar", src: photo, alt: "" }) : null,
              h(
                "div",
                null,
                h("p", { className: "card-name" }, field(entry, "name")),
                h("p", { className: "card-role" }, field(entry, "role")),
              ),
            ),
            h(
              "ul",
              { className: "inset contact-list" },
              ...rows.map(([label, value, copy]) =>
                h(
                  "li",
                  { key: label },
                  h("span", { className: "inset-label" }, label),
                  copy ? h("span", { className: "inset-action" }, "Copy") : null,
                  h("span", { className: "inset-value" }, value),
                ),
              ),
            ),
            h(Tail),
          ),
        ),
      ),
    )
  },
})

/* ---------- Projects ---------- */

const ProjectPreview = createClass({
  render() {
    const { entry, getAsset, widgetFor } = this.props
    const name = field(entry, "name")
    const venue = field(entry, "venue") || ""
    const year = field(entry, "year")
    const category = field(entry, "category")
    const featured = !!field(entry, "featured")
    const image = assetUrl(getAsset, field(entry, "image"))
    const withCategory = category ? `${category} · ${venue}` : venue
    const subtitle = year && !withCategory.includes(String(year)) ? `${withCategory} · ${year}` : withCategory
    const links = list(field(entry, "links"))
    const technologies = list(field(entry, "technologies"))
    return h(
      "div",
      null,
      Thread(
        SectionLabel("In the thread"),
        h(
          "ol",
          { className: "run" },
          h(
            "li",
            { className: "row row-her" },
            h(
              "span",
              { className: `bubble bubble-flush preview preview-${featured ? "large" : "compact"}` },
              image ? h("img", { className: "preview-image", src: image, alt: "" }) : null,
              h(
                "span",
                { className: "preview-text" },
                h("span", { className: "preview-title" }, name),
                h("span", { className: "preview-sub" }, subtitle),
                featured ? h("span", { className: "preview-sub" }, "joud.shawa.dev") : null,
              ),
              h(Tail),
            ),
          ),
        ),
        SectionLabel("Project page"),
      ),
      h(
        "main",
        { className: "article" },
        image ? h("img", { className: "article-image", src: image, alt: "" }) : null,
        h("h1", { className: "article-title" }, name),
        h("p", { className: "article-sub" }, [category, venue, year && !venue.includes(String(year)) ? year : null].filter(Boolean).join(" · ")),
        h("p", { className: "article-lead" }, field(entry, "blurb")),
        h("div", { className: "article-body" }, widgetFor("body")),
        links.length
          ? h(
              "ul",
              { className: "inset article-links" },
              ...links.map((link, i) =>
                h("li", { key: i }, h("span", { className: "inset-row-link" }, h("span", null, link && link.text), h(Chevron))),
              ),
            )
          : null,
        h(
          "p",
          { className: "article-built" },
          h("span", { className: "article-built-label" }, "Built with "),
          technologies.join(", "),
        ),
      ),
    )
  },
})

/* ---------- Papers ---------- */

const PaperPreview = createClass({
  render() {
    const { entry } = this.props
    const venue = field(entry, "venue") || ""
    const year = field(entry, "year")
    const kind = field(entry, "kind") || "DOI"
    return Thread(
      h(
        "ol",
        { className: "run" },
        h(
          "li",
          { className: "row row-her" },
          h(
            "span",
            { className: "bubble bubble-flush doc" },
            h(
              "svg",
              { className: "doc-glyph", viewBox: "0 0 34 44", "aria-hidden": "true" },
              h("path", {
                className: "doc-page",
                d: "M5 0.5h17.5L33.5 11.5v27a5 5 0 0 1-5 5h-23.5a5 5 0 0 1-5-5v-33a5 5 0 0 1 5-5z",
              }),
              h("path", { className: "doc-fold", d: "M22.5 0.5v6a5 5 0 0 0 5 5h6" }),
              h("text", { x: "17", y: "33", textAnchor: "middle" }, kind),
            ),
            h(
              "span",
              { className: "doc-text" },
              h("cite", { className: "doc-title" }, field(entry, "title")),
              h("span", { className: "doc-sub" }, year && !venue.includes(String(year)) ? `${venue} · ${year}` : venue),
              h("span", { className: "doc-sub" }, field(entry, "authors")),
            ),
            h(Tail),
          ),
        ),
      ),
    )
  },
})

CMS.registerPreviewTemplate("milestones", MilestonePreview)
CMS.registerPreviewTemplate("intro", IntroPreview)
CMS.registerPreviewTemplate("profile", ProfilePreview)
CMS.registerPreviewTemplate("projects", ProjectPreview)
CMS.registerPreviewTemplate("papers", PaperPreview)
