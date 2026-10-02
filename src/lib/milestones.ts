const months: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Sept: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
}

export type MonthLabel = { month: string; year: string; iso: string }

/** "Nov 2025" → { month: "Nov", year: "2025", iso: "2025-11" }. "Sept" reads as "Sep". */
export function parseMonth(label: string): MonthLabel {
  const [raw, year] = label.trim().split(/\s+/)
  const month = raw === "Sept" ? "Sep" : raw
  return { month, year, iso: `${year}-${months[month] ?? "01"}` }
}

export type MilestoneGroup = {
  key: string
  start: MonthLabel
  end: MonthLabel | null
  /** Set on the first group of each year, for the year index. */
  yearAnchor: string | null
  items: Milestone[]
}

/**
 * Groups consecutive milestones that share a date label. The data is kept
 * newest first; the thread reads oldest first, so it ends at the present.
 */
export function groupMilestones(milestones: Milestone[]): MilestoneGroup[] {
  const groups: MilestoneGroup[] = []
  const seenYears = new Set<string>()

  const start = (milestone: Milestone) =>
    parseMonth(
      Array.isArray(milestone.date) ? milestone.date[0] : milestone.date
    ).iso
  // Reverse first so same-month items keep their written order once sorted.
  const oldestFirst = [...milestones]
    .reverse()
    .sort((a, b) => start(a).localeCompare(start(b)))

  for (const milestone of oldestFirst) {
    const [startLabel, endLabel] = Array.isArray(milestone.date)
      ? milestone.date
      : [milestone.date, null]
    const key = endLabel ? `${startLabel}–${endLabel}` : startLabel
    const last = groups[groups.length - 1]

    if (last && last.key === key) {
      last.items.push(milestone)
      continue
    }

    const start = parseMonth(startLabel)
    const yearAnchor = seenYears.has(start.year) ? null : start.year
    seenYears.add(start.year)

    groups.push({
      key,
      start,
      end: endLabel ? parseMonth(endLabel) : null,
      yearAnchor,
      items: [milestone],
    })
  }

  return groups
}
