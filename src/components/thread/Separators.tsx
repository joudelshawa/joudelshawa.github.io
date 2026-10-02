import type { MonthLabel } from "@/lib/milestones"
import type { ReactNode } from "react"

function Month({ label, showYear }: { label: MonthLabel; showYear: boolean }) {
  return (
    <time dateTime={label.iso}>
      <b>{label.month}</b>
      {showYear && ` ${label.year}`}
    </time>
  )
}

/** Centred like the thread's own date stamps: "Nov 2025", "Jan – Mar 2025". */
export function DateSeparator({
  start,
  end,
}: {
  start: MonthLabel
  end: MonthLabel | null
}) {
  const sameYear = end && end.year === start.year
  return (
    <p className="separator">
      <Month label={start} showYear={!sameYear} />
      {end && (
        <>
          {" – "}
          <Month label={end} showYear />
        </>
      )}
    </p>
  )
}

export function SectionLabel({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <h2 id={id} className="separator section-label">
      {children}
    </h2>
  )
}
