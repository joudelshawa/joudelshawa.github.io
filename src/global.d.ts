import projectData from "./data/projects"

// export {}

declare global {
  type Project = (typeof projectData)[number]

  type Milestone = {
    text: string
    date: string
    href?: string
  }
}
