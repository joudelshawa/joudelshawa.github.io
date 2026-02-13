import {
  AnimatePresence,
  AnimationProps,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { useContactContext } from "@/contexts/contactContext"
import { useIntroContext } from "@/contexts/introContext"
import useScreenSize from "@/hooks/use-screen-size"
import { ease } from "@/utils/framer"

import ContactDetails from "../Contact/ContactDetails"
import Navlink from "./Navlink"
import Orb from "./Orb"

type Props = {
  navLinks: { href: string; text: string }[]
}

// Scroll threshold to prevent jittery toggling
const SCROLL_THRESHOLD = 10
const ISLAND_ANIMATION_SCALE = 2

const islandTime = (seconds: number) => seconds * ISLAND_ANIMATION_SCALE


export default function Navbar({ navLinks }: Props) {
  const { isMobile, pixelWidth } = useScreenSize()
  const { introComplete } = useIntroContext()
  const { modalOpen, setModalOpen } = useContactContext()
  const { scrollY } = useScroll()

  const lastScrollY = useRef(0)
  const modalPanelRef = useRef<HTMLDivElement>(null)
  const contactToggleRef = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState<boolean>(true)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!modalOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      if (target.closest("a")) {
        setModalOpen(false)
        return
      }

      const clickedInsideModal = modalPanelRef.current?.contains(target) ?? false
      const clickedToggle = contactToggleRef.current?.contains(target) ?? false

      if (!clickedInsideModal && !clickedToggle) {
        setModalOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [modalOpen, setModalOpen])

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (modalOpen) {
      lastScrollY.current = latest
      return
    }

    const delta = latest - lastScrollY.current

    // Require minimum scroll distance to toggle
    if (Math.abs(delta) < SCROLL_THRESHOLD) return

    if (delta > 0 && latest > 100) {
      // Scrolling down — collapse
      setExpanded(false)
    } else {
      // Scrolling up — expand
      setExpanded(true)
    }

    lastScrollY.current = latest
  })

  const showExpanded = modalOpen || expanded || (hovered && !isMobile)
  const isMobileContactOpen = isMobile && modalOpen
  const collapsedWidth = isMobile ? 176 : 212
  const openWidth = isMobile ? Math.min(360, Math.max(260, pixelWidth - 24)) : 480
  const islandWidth = showExpanded ? openWidth : collapsedWidth
  const mobileIslandWidth = isMobileContactOpen
    ? Math.max(320, pixelWidth)
    : showExpanded
      ? openWidth
      : collapsedWidth
  const mobileIslandHeight = isMobileContactOpen ? "100dvh" : "3rem"

  return (
    <div className="fixed left-1/2 top-3 z-50 -translate-x-1/2 text-cream-100">
      <motion.nav
        variants={navbarVariants}
        initial={introComplete ? "visible" : "hidden"}
        animate={introComplete ? (expanded ? "visible" : "collapsed") : "hidden"}
        transition={{ ease, duration: islandTime(0.4) }}
        style={{
          willChange: "transform, opacity",
        }}
      >
      <motion.div
        animate={
          isMobile
            ? {
                width: mobileIslandWidth,
                height: mobileIslandHeight,
                borderRadius: isMobileContactOpen ? 0 : 22,
                y: isMobileContactOpen ? -12 : 0,
              }
            : {
                width: islandWidth,
                height: "auto",
                borderRadius: 22,
                y: 0,
              }
        }
        transition={
          isMobile
            ? isMobileContactOpen
              ? {
                  width: { duration: islandTime(0.55), ease },
                  height: { duration: islandTime(0.55), ease },
                  y: { duration: islandTime(0.55), ease },
                  borderRadius: {
                    duration: islandTime(0.28),
                    delay: islandTime(0.42),
                    ease,
                  },
                }
              : {
                  borderRadius: { duration: islandTime(0.26), ease },
                  width: {
                    duration: islandTime(0.55),
                    delay: islandTime(0.08),
                    ease,
                  },
                  height: {
                    duration: islandTime(0.55),
                    delay: islandTime(0.08),
                    ease,
                  },
                  y: {
                    duration: islandTime(0.55),
                    delay: islandTime(0.08),
                    ease,
                  },
                }
            : { duration: islandTime(0.55), ease }
        }
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="overflow-hidden border border-cream-100/20 bg-ink/90 shadow-xl shadow-ink/30 backdrop-blur-xl"
      >
        <div className="flex h-12 items-center px-3">
          <Orb expanded={showExpanded} />

          {!isMobile && (
            <motion.div
              animate={showExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
              transition={{ duration: islandTime(0.26), ease }}
              className="ml-auto flex items-center gap-4"
              style={{ pointerEvents: showExpanded ? "auto" : "none" }}
            >
              {navLinks.map((link) => (
                <Navlink key={link.href} href={link.href}>
                  {link.text}
                </Navlink>
              ))}

              <button
                ref={contactToggleRef}
                onClick={() => setModalOpen(!modalOpen)}
                className={`h-8 w-24 rounded-full border text-xs uppercase tracking-wide transition-colors duration-500 ${
                  modalOpen
                    ? "border-cream-100/50 bg-cream-100 text-ink"
                    : "border-cream-100/25 bg-transparent text-cream-100"
                }`}
              >
                {modalOpen ? "Close" : "Contact"}
              </button>
            </motion.div>
          )}

          {isMobile && (
            <motion.div
              animate={showExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
              transition={{ duration: islandTime(0.26), ease }}
              style={{ pointerEvents: showExpanded ? "auto" : "none" }}
              className="ml-auto"
            >
              <button
                ref={contactToggleRef}
                onClick={() => setModalOpen(!modalOpen)}
                className={`h-8 w-24 rounded-full border text-xs uppercase tracking-wide transition-colors duration-500 ${
                  modalOpen
                    ? "border-cream-100/50 bg-cream-100 text-ink"
                    : "border-cream-100/25 bg-transparent text-cream-100"
                }`}
              >
                {modalOpen ? "Close" : "Contact"}
              </button>
            </motion.div>
          )}
        </div>

        <AnimatePresence initial={false}>
          {modalOpen && (
            <motion.div
              ref={modalPanelRef}
              transition={{ duration: islandTime(0.7), ease }}
              style={{ transformOrigin: "top" }}
              className={`origin-top border-t border-cream-100/15 ${
                isMobile ? "h-[calc(100dvh-3rem)] overflow-y-auto" : ""
              }`}
              animate={
                isMobile
                  ? { height: "calc(100dvh - 3rem)", opacity: 1, scaleY: 1, y: 0 }
                  : { height: "auto", opacity: 1, scaleY: 1, y: 0 }
              }
              initial={
                isMobile
                  ? { height: 0, opacity: 0, scaleY: 0.98, y: 8 }
                  : { height: 0, opacity: 0, scaleY: 0.92 }
              }
              exit={
                isMobile
                  ? { height: 0, opacity: 0, scaleY: 0.98, y: 8 }
                  : { height: 0, opacity: 0, scaleY: 0.92 }
              }
            >
              <ContactDetails />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </motion.nav>
    </div>
  )
}

const navbarVariants: AnimationProps["variants"] = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease, duration: islandTime(0.4) },
  },
  collapsed: {
    opacity: 1,
    y: 0,
    transition: { ease, duration: islandTime(0.3) },
  },
}
