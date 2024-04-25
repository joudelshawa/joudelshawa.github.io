import { AnimatePresence, motion } from "framer-motion"

import { useContactContext } from "@/contexts/contactContext"
import useScreenSize from "@/hooks/use-screen-size"
import { ease } from "@/utils/framer"
import { cn } from "@/utils/misc"

export default function ContactButton() {
  const { isMobile } = useScreenSize()
  const { modalOpen, setModalOpen } = useContactContext()

  let buttonInnerContent
  if (isMobile) {
    if (modalOpen) {
      buttonInnerContent = <XIcon />
    } else {
      buttonInnerContent = <AtSign />
    }
  } else {
    if (modalOpen) {
      buttonInnerContent = <span className="text-sm">Close</span>
    } else {
      buttonInnerContent = <>Contact Me</>
    }
  }

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0 }}
        exit={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease }}
        layout
        onClick={() => setModalOpen(!modalOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 size-10 rounded-full bg-slate-900 p-2 text-white md:size-auto md:px-4 md:py-2",
          modalOpen ? "bg-red-500" : "bg-slate-900 "
        )}
      >
        {buttonInnerContent}
      </motion.button>
    </AnimatePresence>
  )
}

function AtSign() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-at-sign"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-x"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
