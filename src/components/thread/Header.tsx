import Link from "next/link"

import { cn } from "@/utils/misc"

import type { MouseEvent } from "react"

function Chevron() {
  return (
    <svg
      className="chevron"
      viewBox="0 0 8 14"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1.5 1.5 6.5 7l-5 5.5" />
    </svg>
  )
}

/**
 * Her photo and name, floating over the thread. Tapping it opens her details
 * beside the thread on wide screens, and jumps to her contact card elsewhere.
 */
export default function Header({
  detailsOpen = false,
  onToggleDetails,
}: {
  detailsOpen?: boolean
  onToggleDetails?: () => void
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onToggleDetails || !window.matchMedia("(min-width: 1100px)").matches)
      return
    event.preventDefault()
    onToggleDetails()
  }

  return (
    <>
      <div className="top-fade" aria-hidden="true" />
      <header className={cn("header", detailsOpen && "header-offset")}>
        <a
          className="header-link"
          href="#contact"
          aria-label="Joud, contact details"
          aria-controls="details"
          aria-expanded={detailsOpen}
          onClick={onClick}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="header-avatar"
            src="/me.webp"
            alt=""
            width={48}
            height={48}
          />
          <span className="glass header-name">
            Joud
            <Chevron />
          </span>
        </a>
      </header>
    </>
  )
}

/** The floating back button on an opened link. */
export function BackButton({ href }: { href: string }) {
  return (
    <header className="header header-start">
      <Link
        className="glass back-button"
        href={href}
        aria-label="Back to Joud's messages"
      >
        <svg viewBox="0 0 12 20" aria-hidden="true" focusable="false">
          <path d="M10 2 2 10l8 8" />
        </svg>
      </Link>
    </header>
  )
}
