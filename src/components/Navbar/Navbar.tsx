import {
  AnimationProps,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"
import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import { useRef, useState } from "react"

import { useIntroContext } from "@/contexts/introContext"
import useScreenSize from "@/hooks/use-screen-size"
import { ease } from "@/utils/framer"

import ContactButton from "../Contact/ContactButton"
import ContactModal from "../Contact/ContactModal"
import Navlink from "./Navlink"
import Orb from "./Orb"

type Props = {
  navLinks: { href: string; text: string }[]
}

export default function Navbar({ navLinks }: Props) {
  const { isMobile } = useScreenSize()
  const router = useRouter()
  const { introComplete } = useIntroContext()
  const { scrollY } = useScroll()

  const lastScrollY = useRef(0)
  const [expanded, setExpanded] = useState<boolean>(true)

  // TODO: Reimplement with safari fix
  // ? could be a matter of css will-change or translateZ(0)
  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   if (latest > lastScrollY.current && expanded === false) {
  //     lastScrollY.current = latest
  //     return
  //   } else if (latest < lastScrollY.current && expanded === true) {
  //     lastScrollY.current = latest
  //     return
  //   }

  //   if (latest > lastScrollY.current) setExpanded(false)
  //   else setExpanded(true)

  //   lastScrollY.current = latest
  // })

  return (
    <motion.nav
      variants={navbarVariants}
      initial={introComplete ? "visible" : "hidden"}
      animate={introComplete ? "visible" : "hidden"}
      transition={{ ease, delay: introComplete ? 0 : 1.5, duration: 1 }}
      className={`fixed top-0 z-50 flex h-16 w-full  items-center px-2 text-ink md:px-4 `}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          layout
          className="mx-auto flex w-[calc(100%-1rem)] items-center gap-2 rounded-b-xl border-b border-ink/[0.04] bg-cream-100/80 backdrop-blur-xl md:w-[calc(100%-2rem)]"
          style={{
            // width: expanded ? "100%" : "min-content",
            // marginInline: "auto",
            // width: "100%",
            paddingInline: expanded && !isMobile ? "2rem" : "1rem",
            paddingBlock: "1rem",
            // borderRadius: "9999px",
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
              {navLinks.map((link) => (
                <Navlink key={link.href} href={link.href}>
                  {link.text}
                </Navlink>
              ))}
              <div className="relative h-8 w-20  md:w-24">
                <ContactModal />
                <ContactButton />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  )
}

const navbarVariants: AnimationProps["variants"] = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const linkContainerVariants: AnimationProps["variants"] = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
}
