import Link from "next/link"

import { Tail } from "@/components/thread/Bubble"
import { me } from "@/data/papers"
import { cn } from "@/utils/misc"

function projectSubtitle(project: Project) {
  const venue = project.category
    ? `${project.category} · ${project.venue}`
    : project.venue
  return venue.includes(String(project.year))
    ? venue
    : `${venue} · ${project.year}`
}

/** A project shared as a link: large with its image, or compact with a thumbnail. */
export function LinkPreview({
  project,
  size,
  tail = false,
}: {
  project: Project
  size: "large" | "compact"
  tail?: boolean
}) {
  return (
    <li className="row row-her">
      <Link
        href={`/projects/${project.slug}`}
        className={cn("bubble bubble-flush preview", `preview-${size}`)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="preview-image"
          src={project.image}
          alt=""
          width={size === "large" ? 1280 : 56}
          height={size === "large" ? 720 : 56}
          loading="lazy"
          decoding="async"
        />
        <span className="preview-text">
          <span className="preview-title">{project.name}</span>
          <span className="preview-sub">{projectSubtitle(project)}</span>
          {size === "large" && (
            <span className="preview-sub">joud.shawa.dev</span>
          )}
        </span>
        {tail && <Tail />}
      </Link>
    </li>
  )
}

function DocumentGlyph({ kind }: { kind: Paper["kind"] }) {
  return (
    <svg
      className="doc-glyph"
      viewBox="0 0 34 44"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="doc-page"
        d="M5 0.5h17.5L33.5 11.5v27a5 5 0 0 1-5 5h-23.5a5 5 0 0 1-5-5v-33a5 5 0 0 1 5-5z"
      />
      <path className="doc-fold" d="M22.5 0.5v6a5 5 0 0 0 5 5h6" />
      <text x="17" y="33" textAnchor="middle">
        {kind}
      </text>
    </svg>
  )
}

/** Keeps each match of `pattern` on one line ("Kocak, S. A.", "501-505"). */
function KeepTogether({
  text,
  pattern,
  highlight,
}: {
  text: string
  pattern: RegExp
  highlight?: string
}) {
  const parts = text.split(pattern)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span
            key={i}
            className={cn("nowrap", part === highlight && "doc-me")}
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}

const authorName = /([A-Z][\w'’-]+, (?:[A-Z]\. ?)*[A-Z]\.)/
const unbreakable = /(\d+-\d+|\(non-archival\))/

/** A paper shared as a document. */
export function DocumentBubble({
  paper,
  tail = false,
}: {
  paper: Paper
  tail?: boolean
}) {
  const venue = paper.venue.includes(String(paper.year))
    ? paper.venue
    : `${paper.venue} · ${paper.year}`
  return (
    <li className="row row-her">
      <a
        className="bubble bubble-flush doc"
        href={paper.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <DocumentGlyph kind={paper.kind} />
        <span className="doc-text">
          <cite className="doc-title">{paper.title}</cite>
          <span className="doc-sub">
            <KeepTogether text={venue} pattern={unbreakable} />
          </span>
          <span className="doc-sub">
            <KeepTogether
              text={paper.authors}
              pattern={authorName}
              highlight={me}
            />
          </span>
        </span>
        {tail && <Tail />}
      </a>
    </li>
  )
}
