import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"

export const IntroContext = createContext<IntroContextType | null>(null)

export type IntroContextType = {
  shouldShowIntro: boolean
  setShouldShowIntro: Dispatch<SetStateAction<boolean>>
}

export default function IntroContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [shouldShowIntro, setShouldShowIntro] = useState(true)

  return (
    <IntroContext.Provider value={{ shouldShowIntro, setShouldShowIntro }}>
      {children}
    </IntroContext.Provider>
  )
}

export function useIntroContext() {
  const context = useContext(IntroContext)
  if (context === null) {
    throw new Error(
      "useIntroContext must be used within a IntroContextProvider"
    )
  }
  return context
}
