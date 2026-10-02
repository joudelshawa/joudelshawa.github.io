import { useEffect, useState } from "react"

import { TypingIndicator } from "@/components/thread/Bubble"
import { land } from "@/lib/spring"

import type { RefObject } from "react"

const typingMs = 420
const staggerMs = 60

/**
 * Plays her greeting once per session: one typing indicator, then each
 * `.arrive` element in the container lands with the spring.
 *
 * The head script in _document sets `data-arrive` on <html> only when this
 * should play, and CSS hides `.arrive` only under that attribute, so without JS
 * (or with reduced motion, or on a repeat visit) everything is simply there.
 */
export default function Arrival({
  container,
}: {
  container: RefObject<HTMLElement>
}) {
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (!root.hasAttribute("data-arrive") || !container.current) return

    const elements = Array.from(container.current.querySelectorAll(".arrive"))
    setTyping(true)

    const timer = window.setTimeout(() => {
      setTyping(false)
      elements.forEach((element, i) => land(element, i * staggerMs))
      root.removeAttribute("data-arrive")
      try {
        sessionStorage.setItem("arrived", "1")
      } catch {}
    }, typingMs)

    return () => {
      window.clearTimeout(timer)
      root.removeAttribute("data-arrive")
    }
  }, [container])

  return typing ? <TypingIndicator className="typing-overlay" /> : null
}
