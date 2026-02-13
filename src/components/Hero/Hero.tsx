import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { useIntroContext } from "@/contexts/introContext"
import { ease } from "@/utils/framer"

import TextBubbles from "./TextBubbles"

export default function Hero() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  })

  const { introComplete } = useIntroContext()
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const scrollCueY = useTransform(scrollYProgress, [0, 0.24], [0, 8])

  return (
    <motion.section
      ref={scrollContainerRef}
      className="h-[220vh] overflow-x-clip px-4"
      id="hero"
    >
      {/* Base gradient */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            ease: "linear",
            delay: introComplete ? 0 : 1,
            duration: introComplete ? 0.4 : 2,
          },
        }}
        className="absolute left-0 top-0 z-[-1] h-[220vh] w-full bg-gradient-to-b from-terracotta-faint/80 via-cream-200/60 to-transparent"
      />

      <motion.div className="sticky left-0 top-0 mx-auto mb-4 flex h-screen max-w-7xl grid-cols-1 items-center justify-center gap-4 ">
        <TextBubbles scrollYProgress={scrollYProgress} />
        <motion.div
          layoutId="avatar-lg"
          transition={{
            layout: {
              duration: 1,
              ease,
            },
          }}
          style={{
            borderRadius: 20,
          }}
          className="z-0 hidden aspect-square w-full min-w-[25rem] max-w-[40%] bg-[url('/me.jpg')] bg-cover bg-top shadow-2xl shadow-ink/10 md:block"
        />

        <motion.div
          style={{ opacity: scrollCueOpacity, y: scrollCueY }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden
        >
          <div className="rounded-full rounded-br-md bg-cream-200/90 px-4 py-2 text-sm font-light text-ink shadow-sm shadow-ink/10">
            Scroll to continue ↓
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
