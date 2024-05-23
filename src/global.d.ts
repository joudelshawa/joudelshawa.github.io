import projectData from './data/projects'

// export {}

declare global {
  type Project = {
    name: string
    slug: string
    blurb: string
    description: string
    technologies: string[]
    image: string
    year: number
    links?: {
      text: string
      href: string
    }[]
  }

  type Milestone = {
    text: string
    date: string | [string, string]
    href?: string
  }
}
