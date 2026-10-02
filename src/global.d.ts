export {}

declare global {
  type Project = {
    name: string
    slug: string
    venue: string
    blurb: string
    technologies: string[]
    image: string
    year: number
    category?: string
    links?: {
      text: string
      href: string
    }[]
  }

  type Milestone = {
    text: string
    date: string | [string, string]
    /** Her highlights; not shown differently yet. */
    isFocused?: boolean
  }

  type Paper = {
    title: string
    authors: string
    venue: string
    year: number
    href: string
    kind: "PDF" | "DOI"
  }
}
