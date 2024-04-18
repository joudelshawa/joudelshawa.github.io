import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { ease } from "@/utils/framer"

import TextBubbles from "./TextBubbles"

export default function Hero() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: scrollContainerRef })

  return (
    <motion.section
      ref={scrollContainerRef}
      className="h-[300vh] overflow-x-clip px-4"
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { ease: "linear", delay: 1, duration: 2 },
        }}
        className="absolute left-0 top-0 z-[-1] h-[300vh] w-full bg-gradient-to-b from-pink-100 via-violet-100 to-white"
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
          className="z-0 hidden aspect-square w-full min-w-[25rem] max-w-[40%]  bg-[url('/me.jpg')]  bg-cover bg-top md:block"
        />
      </motion.div>
    </motion.section>
  )
}
