import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"

export const DataContext = createContext<DataContextType | null>(null)

export type DataContextType = {
  currentDataSource: "projects" | "milestones"
  setCurrentDataSource: Dispatch<SetStateAction<"projects" | "milestones">>
}

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentDataSource, setCurrentDataSource] = useState<
    "projects" | "milestones"
  >("projects")
  return (
    <DataContext.Provider
      value={{
        currentDataSource,
        setCurrentDataSource,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  const context = useContext(DataContext)
  if (context === null) {
    throw new Error("useDataContext must be used within a DataContextProvider")
  }
  return context
}
