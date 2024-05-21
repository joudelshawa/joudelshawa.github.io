import { AnimationProps, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Inter } from 'next/font/google'
import { useRef, useState } from 'react'

import { useIntroContext } from '@/contexts/introContext'
import useScreenSize from '@/hooks/use-screen-size'
import { ease } from '@/utils/framer'

import ContactButton from '../Contact/ContactButton'
import Navlink from './Navlink'
import Orb from './Orb'

const inter = Inter({ subsets: ["latin"] })

export default function Navbar() {
  const { isMobile } = useScreenSize()
  const { shouldShowIntro } = useIntroContext()
  const { scrollY } = useScroll()

  const lastScrollY = useRef(0)
  const [expanded, setExpanded] = useState<boolean>(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY.current && expanded === false) {
      lastScrollY.current = latest
      return
    } else if (latest < lastScrollY.current && expanded === true) {
      lastScrollY.current = latest
      return
    }

    if (latest > lastScrollY.current) setExpanded(false)
    else setExpanded(true)

    lastScrollY.current = latest
  })

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease, delay: shouldShowIntro ? 2 : 0, duration: 1 }}
      className={`fixed top-1 z-50 h-16 w-full text-slate-800  ${inter.className} flex items-center px-4`}
    >
      <motion.div
        layout
        className="mx-auto flex max-w-7xl items-center gap-2 border-2 bg-white/80 py-4 filter backdrop-blur-xl"
        style={{
          width: expanded ? "100%" : "min-content",
          paddingInline: expanded && !isMobile ? "2rem" : "1rem",
          borderRadius: "9999px",
        }}
      >
        <Orb expanded={expanded} />
        {expanded && (
          <motion.div
            variants={linkContainerVariants}
            initial="hidden"
            animate="visible"
            className="ml-auto flex items-center gap-4"
          >
            <Navlink href="#projects">Projects</Navlink>
            <Navlink href="#milestones">Milestones</Navlink>
            <ContactButton />
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  )
}

const linkContainerVariants: AnimationProps["variants"] = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
}
