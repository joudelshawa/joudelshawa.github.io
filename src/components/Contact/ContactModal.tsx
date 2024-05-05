import { motion, useAnimate } from "framer-motion"

import { useContactContext } from "@/contexts/contactContext"
import useScreenSize from "@/hooks/use-screen-size"
import { ease } from "@/utils/framer"

import ContactDetails from "./ContactDetails"

export default function ContactSection() {
  const { setModalOpen } = useContactContext()
  const { pixelWidth, pixelHeight } = useScreenSize()
  const [scope, animate] = useAnimate()
  let vMax

  if (pixelWidth && pixelHeight) {
    const maxValue = Math.max(pixelWidth, pixelHeight) * 1.5

    vMax = maxValue
  }

  async function handleClose() {
    await animate(
      scope.current,
      { opacity: 0 },
      {
        onComplete: () => {
          scope.current.style.display = "none"
          setModalOpen(false)
        },
      }
    )
  }

  return (
    <section className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center overflow-clip">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        style={{
          position: "fixed",
          width: `${vMax}px`,
          height: `${vMax}px`,
        }}
        transition={{ duration: 0.5, ease }}
        onClick={handleClose}
        className=" z-50 flex flex-col items-center justify-center gap-4 rounded-full bg-slate-900 px-4"
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          ref={scope}
          className=" flex flex-col items-center justify-center px-4"
        >
          <h1 className="text-[clamp(3rem,1.0356rem+2.8275vw,4.75rem)] font-semibold tracking-tighter text-white">
            Contact me
          </h1>
          <ContactDetails />
        </div>
      </motion.div>
    </section>
  )
}
