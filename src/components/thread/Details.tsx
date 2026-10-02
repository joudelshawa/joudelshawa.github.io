import { useEffect, useRef } from "react"

import { ContactList } from "@/components/thread/Contact"
import { cn } from "@/utils/misc"

/**
 * The conversation's details, opened from her name on wide screens the way
 * Messages shows details on a Mac. Closed by default; Escape closes it.
 */
export default function Details({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const done = useRef<HTMLButtonElement>(null)
  const close = useRef(onClose)
  close.current = onClose

  useEffect(() => {
    if (!open) return
    done.current?.focus()
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && close.current()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <aside
      id="details"
      className={cn("details", open && "is-open")}
      aria-label="Conversation details"
      hidden={!open}
    >
      <button
        ref={done}
        className="details-done"
        type="button"
        onClick={onClose}
      >
        Done
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="details-avatar"
        src="/me.webp"
        alt=""
        width={88}
        height={88}
      />
      <p className="details-name">Joud El-Shawa</p>
      <p className="details-role">Machine Learning Researcher</p>
      <ContactList />
    </aside>
  )
}
