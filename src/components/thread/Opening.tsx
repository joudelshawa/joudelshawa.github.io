import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { TypingIndicator } from "@/components/thread/Bubble"
import { land } from "@/lib/spring"
import { cn } from "@/utils/misc"

import type { RefObject } from "react"

type Phase = "inbox" | "pressed" | "pushing" | "typing" | "done"

const minInboxMs = 900 // long enough to read the row, even on a fast load
const maxInboxMs = 2500 // never wait longer than this for the page to load
const pressMs = 180 // the row greys, as if tapped
const pushMs = 480
const pushEase = "cubic-bezier(0.32, 0.72, 0, 1)" // the iOS push and sheet curve
const firstTypingMs = 650
// A short pause before each later message, a little longer for longer ones.
const typingFor = (text: string) =>
  Math.min(650, Math.max(420, 380 + text.length * 2))

/**
 * Her greeting, the first time someone visits in a session (see the head
 * script in _document): her contact row in an inbox, which greys and opens
 * into the conversation once the page has loaded, then each message after a
 * short typing pause. Any tap, scroll or key reveals everything at once.
 *
 * Without the `data-arrive` flag (no JS, reduced motion, a repeat visit, or a
 * link to a section) none of this runs and everything is simply there.
 */
export default function Opening({
  screen,
  intro,
  preview,
}: {
  screen: RefObject<HTMLElement>
  intro: RefObject<HTMLElement>
  preview: string
}) {
  const [phase, setPhase] = useState<Phase>("inbox")
  const [typingTop, setTypingTop] = useState<number | null>(null)
  const inbox = useRef<HTMLDivElement>(null)
  const open = useRef<() => void>(() => {})

  useEffect(() => {
    const root = document.documentElement
    const screenEl = screen.current
    const introEl = intro.current
    if (!root.hasAttribute("data-arrive") || !screenEl || !introEl) {
      setPhase("done")
      return
    }

    try {
      sessionStorage.setItem("arrived", "1")
    } catch {}
    root.classList.add("opening")

    const items = Array.from(introEl.querySelectorAll<HTMLElement>(".arrive"))
    const timers = new Set<number>()
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id)
          resolve()
        }, ms)
        timers.add(id)
      })

    let state: "inbox" | "pushing" | "typing" | "done" = "inbox"
    let shown = 0

    const show = (item: HTMLElement) => {
      item.classList.add("is-in")
      land(item)
    }

    const end = () => {
      if (state === "done") return
      state = "done"
      timers.forEach((id) => window.clearTimeout(id))
      timers.clear()
      items.slice(shown).forEach(show)
      shown = items.length
      root.removeAttribute("data-arrive")
      root.classList.remove("opening")
      screenEl.classList.remove("is-pushing")
      setTypingTop(null)
      setPhase("done")
    }

    const type = async () => {
      state = "typing"
      setPhase("typing") // the inbox is gone once the chat has slid in
      for (const [i, item] of items.entries()) {
        if (item.classList.contains("bubble")) {
          setTypingTop(item.offsetTop)
          await wait(
            i === 0 ? firstTypingMs : typingFor(item.textContent ?? "")
          )
          if (state !== "typing") return
          setTypingTop(null)
        } else {
          await wait(240)
          if (state !== "typing") return
        }
        show(item)
        shown = i + 1
      }
      end()
    }

    open.current = async () => {
      if (state !== "inbox") return
      state = "pushing"
      setPhase("pressed")
      await wait(pressMs)
      setPhase("pushing")
      screenEl.classList.add("is-pushing")
      const motion = [
        screenEl.animate(
          [{ transform: "translateX(100%)" }, { transform: "none" }],
          { duration: pushMs, easing: pushEase }
        ),
        inbox.current?.animate(
          [{ transform: "none" }, { transform: "translateX(-30%)" }],
          { duration: pushMs, easing: pushEase, fill: "forwards" }
        ),
      ]
      await Promise.all(
        motion.map((animation) => animation?.finished.catch(() => {}))
      )
      screenEl.classList.remove("is-pushing")
      root.classList.remove("opening")
      if (state !== "pushing") return
      void type()
    }

    // Open once the page has loaded and the row has been on screen a moment.
    const loaded = new Promise<void>((resolve) =>
      document.readyState === "complete"
        ? resolve()
        : window.addEventListener("load", () => resolve(), { once: true })
    )
    void Promise.race([
      Promise.all([loaded, wait(minInboxMs)]),
      wait(maxInboxMs),
    ]).then(() => open.current())

    // Keys open the conversation early; any interaction while she's typing
    // reveals the rest at once.
    const interact = (event: Event) => {
      if (state === "inbox" && event.type === "keydown") open.current()
      else if (state === "typing") end()
    }
    const events = ["keydown", "pointerdown", "wheel", "touchstart"] as const
    events.forEach((name) =>
      window.addEventListener(name, interact, { passive: true })
    )

    return () => {
      events.forEach((name) => window.removeEventListener(name, interact))
      end()
    }
  }, [screen, intro])

  return (
    <>
      {phase === "inbox" || phase === "pressed" || phase === "pushing" ? (
        // Her row in a Messages-style inbox, as if you're about to open the chat.
        <div
          ref={inbox}
          className="inbox"
          onClick={() => open.current()}
          aria-hidden="true"
        >
          <div className="inbox-list">
            <div className={cn("inbox-row", phase !== "inbox" && "is-pressed")}>
              <span className="inbox-unread" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="inbox-avatar"
                src="/me.webp"
                alt=""
                width={40}
                height={40}
              />
              <div className="inbox-text">
                <div className="inbox-top">
                  <span className="inbox-name">Joud</span>
                  <svg
                    className="chevron"
                    viewBox="0 0 8 14"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M1.5 1.5 6.5 7l-5 5.5" />
                  </svg>
                </div>
                <p className="inbox-preview">{preview}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {typingTop !== null && intro.current
        ? createPortal(
            <TypingIndicator
              className="typing-overlay"
              style={{ top: typingTop }}
            />,
            intro.current
          )
        : null}
    </>
  )
}
