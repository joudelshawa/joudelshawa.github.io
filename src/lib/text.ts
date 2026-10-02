const emoji =
  "(?:\\p{Regional_Indicator}{2}|\\p{Extended_Pictographic}(?:\\uFE0F|\\p{Emoji_Modifier})?(?:\\u200D\\p{Extended_Pictographic}(?:\\uFE0F|\\p{Emoji_Modifier})?)*)"
const trailingEmoji = new RegExp(`\\s*(${emoji})\\s*$`, "u")

/** Collapses the line breaks in template-literal copy into single spaces. */
export function clean(text: string) {
  return text.replace(/\s*\n\s*/g, " ").trim()
}

/**
 * Splits a message's trailing emoji off so it can become a reaction.
 * "Officially graduated! … 🎓" → { text: "Officially graduated! …", reaction: "🎓" }
 */
export function splitReaction(raw: string) {
  const text = clean(raw)
  const match = text.match(trailingEmoji)
  if (!match || match.index === undefined) return { text, reaction: null }
  return { text: text.slice(0, match.index).trimEnd(), reaction: match[1] }
}
