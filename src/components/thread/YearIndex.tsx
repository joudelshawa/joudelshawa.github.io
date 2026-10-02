import { cn } from "@/utils/misc"

/**
 * A year index on the edge of the screen while the milestones are in view,
 * like the letter index in Contacts. On wide screens the details pane shows
 * the years instead.
 */
export default function YearIndex({
  years,
  active,
}: {
  years: string[]
  active: string | null
}) {
  return (
    <nav
      className={cn("year-index", active && "is-visible")}
      aria-label="Milestones by year"
      aria-hidden={!active}
    >
      {years.map((year) => (
        <a
          key={year}
          href={`#y${year}`}
          tabIndex={active ? 0 : -1}
          aria-current={active === year ? "true" : undefined}
        >
          {year}
        </a>
      ))}
    </nav>
  )
}
