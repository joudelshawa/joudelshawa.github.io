import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

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

  useEffect(() => {
    // TODO: replace with lenis equivalent once lenis is implemented
    if (modalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [modalOpen])

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
