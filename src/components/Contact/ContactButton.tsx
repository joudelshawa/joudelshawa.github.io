import { motion } from 'framer-motion'
import { useState } from 'react'

import useScreenSize from '@/hooks/use-screen-size'
import { cn } from '@/utils/misc'

import ContactSection from './ContactSection'

export default function ContactButton() {
  const { isMobile } = useScreenSize()
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <motion.button
      initial={false}
      layout
      onClick={() => setModalOpen(!modalOpen)}
      className={cn(
        "fixed size-10 rounded-full bg-slate-900 p-2 text-white md:size-auto md:px-4 md:py-2",
        modalOpen
          ? "left-0 top-0 -translate-x-1/2 -translate-y-1/2"
          : "bottom-6 right-6 "
      )}
    >
      {isMobile ? <AtSign /> : <span className="text-sm">Contact Me</span>}
    </motion.button>
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
