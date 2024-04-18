import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"

export const ProjectContext = createContext<ProjectContextType | null>(null)

export type ProjectContextType = {
  inViewProject: Project | null
  setInViewProject: Dispatch<SetStateAction<Project | null>>
}

export default function ProjectContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [inViewProject, setInViewProject] = useState<Project | null>(null)

  return (
    <ProjectContext.Provider value={{ inViewProject, setInViewProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjectContext() {
  const context = useContext(ProjectContext)
  if (context === null) {
    throw new Error(
      "useProjectContext must be used within a ProjectContextProvider"
    )
  }
  return context
}
