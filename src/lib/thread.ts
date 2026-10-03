import { land } from "./spring"

/**
 * Adds the visitor's blue bubble to a run (from the page's #tpl-sent
 * template). Only the newest bubble in a run keeps its tail.
 */
export function sendBubble(run: HTMLElement, text: string) {
  const template = document.querySelector<HTMLTemplateElement>("#tpl-sent")
  const row = template?.content.firstElementChild?.cloneNode(true)
  if (!(row instanceof HTMLElement)) return
  run.querySelectorAll(".tail").forEach((tail) => tail.remove())
  const label = row.querySelector("span")
  if (label) label.textContent = text
  run.append(row)
  const bubble = row.querySelector(".bubble")
  if (bubble) land(bubble)
}

/** A run for the visitor's bubbles, created the first time it's needed. */
export function visitorRun(before: Element, label: string) {
  const run = document.createElement("ol")
  run.className = "run run-you"
  run.setAttribute("aria-label", label)
  before.before(run)
  return run
}

/** Replaces the receipt under a run ("Delivered"), so its fade replays. */
export function receipt(after: Element, text: string, previous: HTMLElement | null) {
  previous?.remove()
  const note = document.createElement("p")
  note.className = "receipt"
  note.textContent = text
  after.after(note)
  return note
}
