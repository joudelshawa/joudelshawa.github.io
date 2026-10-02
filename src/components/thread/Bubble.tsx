import { cn } from "@/utils/misc"

import type { ReactNode } from "react"

type Side = "her" | "you"

/**
 * The iOS 26 tail, traced from Apple's own screenshot: the bubble keeps its
 * rounded corner, and the tail hangs beneath it, leaving the corner's arc 3px
 * above the bottom, dropping to a rounded tip 7.5px below and 8.5px in, and
 * rejoining the bottom edge 22.6px in. Drawn for her side; the visitor's side
 * mirrors it in CSS.
 */
export function Tail() {
  return (
    <svg
      className="tail"
      viewBox="0 -4 24 12"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8.9 -3.2 C9.6 -2.3 10.3 -1.2 10.3 0.4 C10.3 2.2 9.6 3.6 8.6 4.9 C8 5.7 7.9 6.8 8.4 7.3 C8.8 7.7 9.6 7.5 10.4 6.9 C13.5 4.9 18 2 22.6 0 L22.6 -3.2 Z" />
    </svg>
  )
}

/**
 * Her trailing emoji, moved onto the bubble's corner. It stays in the DOM
 * straight after the text, so it's read in place.
 */
export function Reaction({ emoji }: { emoji: string }) {
  return (
    <>
      {" "}
      <span className="reaction">{emoji}</span>
    </>
  )
}

type BubbleProps = {
  side?: Side
  tail?: boolean
  reaction?: string | null
  /** No padding: for link previews, documents and cards that lay out their own. */
  flush?: boolean
  /** Hidden until the arrival plays (see Arrival). */
  arrive?: boolean
  className?: string
  children: ReactNode
}

export default function Bubble({
  side = "her",
  tail = false,
  reaction = null,
  flush = false,
  arrive = false,
  className,
  children,
}: BubbleProps) {
  return (
    <li className={cn("row", `row-${side}`, reaction && "has-reaction")}>
      <div
        className={cn(
          "bubble",
          side === "you" && "bubble-you",
          flush && "bubble-flush",
          arrive && "arrive",
          className
        )}
      >
        {children}
        {reaction && <Reaction emoji={reaction} />}
        {tail && <Tail />}
      </div>
    </li>
  )
}

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn("typing", className)}
      role="status"
      aria-label="Joud is typing"
    >
      <span />
      <span />
      <span />
    </div>
  )
}
