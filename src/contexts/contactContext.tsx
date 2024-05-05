import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react"

export const ContactContext = createContext<ContactContextType | null>(null)

export type ContactContextType = {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function ContactContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ContactContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContactContext() {
  const context = useContext(ContactContext)
  if (context === null) {
    throw new Error(
      "useContactContext must be used within a ContactContextProvider"
    )
  }
  return context
}
