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
    if (modalOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${Math.max(0, scrollbarWidth)}px`
    } else {
      document.body.style.overflow = "auto"
      document.body.style.paddingRight = ""
    }

    return () => {
      document.body.style.overflow = "auto"
      document.body.style.paddingRight = ""
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
