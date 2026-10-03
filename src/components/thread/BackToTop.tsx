import { useEffect, useState } from "react"

import { prefersReducedMotion } from "@/lib/spring"
import { cn } from "@/utils/misc"

/**
 * A small glass button in the bottom-right corner that takes you back to the
 * top of the conversation. It appears once her greeting is out of view.
 */
export default function BackToTop({ watch }: { watch: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.querySelector(watch)
    if (!target) return
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [watch])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
    document
      .querySelector<HTMLElement>("main h1")
      ?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      className={cn("glass to-top", visible && "is-visible")}
      onClick={goToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M3.5 10 8 5.5l4.5 4.5" />
      </svg>
    </button>
  )
}
