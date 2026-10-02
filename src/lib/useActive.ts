import { useEffect, useState } from "react"

/**
 * Which milestone year sits in the middle band of the screen (groups carry
 * `data-year`). One observer, no scroll handlers.
 */
export function useActiveYear() {
  const [year, setYear] = useState<string | null>(null)

  useEffect(() => {
    const groups = Array.from(
      document.querySelectorAll<HTMLElement>("[data-year]")
    )
    const inBand = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting
            ? inBand.add(entry.target)
            : inBand.delete(entry.target)
        )
        const current = groups.find((group) => inBand.has(group))
        setYear(current ? current.dataset.year ?? null : null)
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    groups.forEach((group) => observer.observe(group))
    return () => observer.disconnect()
  }, [])

  return year
}
