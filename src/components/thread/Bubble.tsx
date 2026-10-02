import { cn } from "@/utils/misc"

import type { ReactNode } from "react"

type Side = "her" | "you"

/**
 * The iOS 26 tail: a hook hanging under the bottom outer corner, measured from
 * Apple's own screenshots (tip 8.5px in and 7.5px below, rejoining 23px in).
 * Drawn for her side; the visitor's side mirrors it in CSS.
 */
export function Tail() {
  return (
    <svg
      className="tail"
      viewBox="0 -18 24 26"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 -18 L0 -8 C0 -3.5 2.6 0.4 8 2.2 C9.7 2.8 10.1 4.6 8.6 7.2 C8.3 7.8 8.9 8.2 9.5 7.9 C11.6 4.6 15.8 0.6 23 0 L24 0 L24 -18 Z" />
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
