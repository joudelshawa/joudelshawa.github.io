import { useEffect, useRef, useState } from "react"

import Bubble from "@/components/thread/Bubble"
import { land, prefersReducedMotion } from "@/lib/spring"
import { cn } from "@/utils/misc"

import type { MouseEvent } from "react"

const replies = [
  { text: "Projects?", target: "projects" },
  { text: "Papers?", target: "papers" },
  { text: "Milestones?", target: "milestones" },
  { text: "Contact?", target: "contact" },
]

/**
 * The visitor's side of the conversation. Tapping a reply sends it as their
 * own blue bubble, then takes them to the answer, which is the section itself.
 * A reply leaves the suggestions once it's sent. Without JS the replies are
 * plain links to the sections.
 */
export default function SuggestedReplies() {
  const [sent, setSent] = useState<
    { id: number; text: string; target: string }[]
  >([])
  const remaining = replies.filter(
    (reply) => !sent.some((message) => message.target === reply.target)
  )

  // Fade the strip's right edge only while it actually scrolls.
  const strip = useRef<HTMLElement>(null)
  const [overflowing, setOverflowing] = useState(false)
  useEffect(() => {
    const element = strip.current
    if (!element) return
    const measure = () =>
      setOverflowing(element.scrollWidth > element.clientWidth + 1)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [remaining.length])

  const send = (
    event: MouseEvent<HTMLAnchorElement>,
    text: string,
    target: string
  ) => {
    event.preventDefault()
    setSent((previous) => [...previous, { id: Date.now(), text, target }])
    window.setTimeout(
      () => {
        document.getElementById(target)?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        })
        history.replaceState(null, "", `#${target}`)
      },
      prefersReducedMotion() ? 0 : 420
    )
  }

  return (
    <>
      {sent.length > 0 && (
        <>
          <ol className="run run-you" aria-label="Your messages">
            {sent.map((message, i) => (
              <SentBubble
                key={message.id}
                text={message.text}
                tail={i === sent.length - 1}
              />
            ))}
          </ol>
          <p className="receipt" key={sent.length}>
            Delivered
          </p>
        </>
      )}
      <nav
        ref={strip}
        className={cn(
          "replies",
          "arrive",
          remaining.length === 0 && "is-empty",
          overflowing && "is-overflowing"
        )}
        aria-label="Reply to Joud"
      >
        {remaining.map((reply) => (
          <a
            key={reply.target}
            className="reply"
            href={`#${reply.target}`}
            onClick={(event) => send(event, reply.text, reply.target)}
          >
            {reply.text}
          </a>
        ))}
      </nav>
    </>
  )
}

function SentBubble({ text, tail }: { text: string; tail: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current?.parentElement) land(ref.current.parentElement)
  }, [])

  return (
    <Bubble side="you" tail={tail}>
      <span ref={ref}>{text}</span>
    </Bubble>
  )
}
