import projectData from "./data/projects"

// export {}

declare global {
  type Project = {
    name: string
    slug: string
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
    href?: string
    hoverImage?: string
  }
}
