import type { CollectionEntry } from "astro:content"

type Milestone = CollectionEntry<"milestones">

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export type MonthLabel = { month: string; year: string; iso: string }

/** "2025-11" → { month: "Nov", year: "2025", iso: "2025-11" } */
export function parseMonth(iso: string): MonthLabel {
  const [year, month] = iso.split("-")
  return { month: monthNames[Number(month) - 1], year, iso }
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
 * Milestones oldest first (by start month, then `order`, then file name), with
 * consecutive ones that share a date range grouped under one separator.
 */
export function groupMilestones(milestones: Milestone[]): MilestoneGroup[] {
  const sorted = [...milestones].sort(
    (a, b) =>
      a.data.start.localeCompare(b.data.start) ||
      a.data.order - b.data.order ||
      a.id.localeCompare(b.id)
  )

  const groups: MilestoneGroup[] = []
  const seenYears = new Set<string>()

  for (const milestone of sorted) {
    const { start, end } = milestone.data
    const key = end ? `${start}–${end}` : start
    const last = groups[groups.length - 1]

    if (last && last.key === key) {
      last.items.push(milestone)
      continue
    }

    const startLabel = parseMonth(start)
    const yearAnchor = seenYears.has(startLabel.year) ? null : startLabel.year
    seenYears.add(startLabel.year)

    groups.push({
      key,
      start: startLabel,
      end: end ? parseMonth(end) : null,
      yearAnchor,
      items: [milestone],
    })
  }

  return groups
}
