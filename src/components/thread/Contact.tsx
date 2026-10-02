import { useEffect, useRef, useState } from "react"

import Bubble, { Tail } from "@/components/thread/Bubble"
import { land } from "@/lib/spring"

import type { FormEvent } from "react"

const email = "jelshawa@gmail.com"

const links = [
  {
    label: "LinkedIn",
    text: "joudelshawa",
    href: "https://www.linkedin.com/in/joudelshawa",
  },
  {
    label: "GitHub",
    text: "joudelshawa",
    href: "https://github.com/joudelshawa",
  },
  { label: "Résumé", text: "PDF", href: "/resume.pdf" },
]

/** Email (with copy), LinkedIn, GitHub and résumé, as an inset list. */
export function ContactList() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <ul className="inset contact-list">
      <li>
        <span className="inset-label">Email</span>
        <button className="inset-action" type="button" onClick={copy}>
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
        <a className="inset-value" href={`mailto:${email}`}>
          {email}
        </a>
      </li>
      {links.map((link) => (
        <li key={link.label}>
          <span className="inset-label">{link.label}</span>
          <a
            className="inset-value"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Her contact card, shared in the thread. */
export function ContactCard() {
  return (
    <li className="row row-her">
      <div className="bubble bubble-flush card">
        <div className="card-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="card-avatar"
            src="/me.webp"
            alt="Joud El-Shawa"
            width={64}
            height={64}
            loading="lazy"
          />
          <div>
            <p className="card-name">Joud El-Shawa</p>
            <p className="card-role">Machine Learning Researcher</p>
          </div>
        </div>
        <ContactList />
        <Tail />
      </div>
    </li>
  )
}

/**
 * The visitor's message field. Sending opens their email app with the message
 * addressed to her, and shows it as sent, without pretending it was delivered.
 */
export function Composer() {
  const [draft, setDraft] = useState("")
  const [sent, setSent] = useState<string | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    const subject = encodeURIComponent("Hello from joud.shawa.dev")
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(
      text
    )}`
    setSent(text)
    setDraft("")
  }

  return (
    <>
      {sent && (
        <>
          <ol className="run run-you" aria-label="Your message">
            <SentMessage key={sent} text={sent} />
          </ol>
          <p className="receipt">Opened in your email app</p>
        </>
      )}
      <form
        className="composer"
        action={`mailto:${email}`}
        method="post"
        encType="text/plain"
        onSubmit={submit}
      >
        <label className="sr-only" htmlFor="composer-input">
          Message Joud by email
        </label>
        <input
          id="composer-input"
          name="message"
          className="composer-input"
          placeholder="Message"
          autoComplete="off"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          className="composer-send"
          type="submit"
          disabled={!draft.trim()}
          aria-label="Send as an email"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
          </svg>
        </button>
      </form>
    </>
  )
}

function SentMessage({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current?.parentElement) land(ref.current.parentElement)
  }, [])

  return (
    <Bubble side="you" tail>
      <span ref={ref}>{text}</span>
    </Bubble>
  )
}
