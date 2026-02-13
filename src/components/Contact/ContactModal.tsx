import { AnimatePresence, AnimationProps, motion } from "framer-motion"

import { useContactContext } from "@/contexts/contactContext"
import useScreenSize from "@/hooks/use-screen-size"
import { ease } from "@/utils/framer"

import ContactDetails from "./ContactDetails"

type Props = {
  durationScale?: number
}

export default function ContactModal({ durationScale = 1 }: Props) {
  const { isMobile, pixelWidth, pixelHeight } = useScreenSize()
  const { modalOpen } = useContactContext()

  const mobileSizes = {
    height: pixelHeight,
    width: pixelWidth,
  }

  // Scale down to fit smaller screens while maintaining 5:3 aspect ratio
  const desktopHeight = Math.min(800, pixelHeight * 0.85)
  const desktopWidth = (desktopHeight * 480) / 800

  const variants: AnimationProps["variants"] = {
    open: {
      height: isMobile ? mobileSizes.height : desktopHeight,
      width: isMobile ? mobileSizes.width : desktopWidth,
      top: isMobile ? "-1rem" : "-10px",
      right: isMobile ? "-2rem" : "-10px",
      borderRadius: isMobile ? 0 : 24,
      transition: {
        duration: 0.7 * durationScale,
        ease,
      },
    },
    closed: {
      height: 32,
      width: isMobile ? 80 : 96,
      top: isMobile ? "0rem" : "0px",
      right: isMobile ? "0rem" : "0px",
      borderRadius: 24,
      transition: {
        duration: 0.7 * durationScale,
        delay: 0.35 * durationScale,
        ease,
      },
    },
  }
  return (
    <motion.div
      variants={variants}
      animate={modalOpen ? "open" : "closed"}
      initial="closed"
      className="absolute right-0 top-0 h-8 w-20 overflow-hidden rounded-[25px] bg-ink text-xs uppercase md:w-24 md:text-sm"
    >
      <AnimatePresence>{modalOpen && <ContactDetails />}</AnimatePresence>
    </motion.div>
  )
}
