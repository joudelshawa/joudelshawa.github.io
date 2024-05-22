import {
  AnimatePresence,
  AnimationProps,
  motion,
  MotionProps,
  useAnimate,
} from "framer-motion"

import { useContactContext } from "@/contexts/contactContext"
import useScreenSize from "@/hooks/use-screen-size"
import { ease } from "@/utils/framer"

import ContactDetails from "./ContactDetails"
import styles from "./ContactModal.module.css"

export default function ContactModal() {
  const { isMobile, pixelWidth, pixelHeight } = useScreenSize()
  const { modalOpen, setModalOpen } = useContactContext()

  const mobileSizes = {
    height: pixelHeight,
    width: pixelWidth,
  }

  const variants: AnimationProps["variants"] = {
    open: {
      height: isMobile ? mobileSizes.height : 650,
      width: isMobile ? mobileSizes.width : 480,
      top: isMobile ? "-1.5rem" : "-10px",
      right: isMobile ? "-2rem" : "-10px",
      borderRadius: isMobile ? 0 : 24,
      transition: {
        duration: 0.7,
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
        duration: 0.7,
        delay: 0.35,
        ease,
      },
    },
  }
  return (
    <motion.div
      variants={variants}
      animate={modalOpen ? "open" : "closed"}
      initial="closed"
      className="absolute right-0 top-0 h-8 w-20 overflow-hidden rounded-[25px] bg-slate-900 text-xs uppercase md:w-24 md:text-sm"
    >
      <AnimatePresence>{modalOpen && <ContactDetails />}</AnimatePresence>
    </motion.div>
  )
}
