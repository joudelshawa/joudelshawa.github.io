import { cubicBezier, motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { ease } from "@/utils/framer"

type Props = {
  children: React.ReactNode
}

export default function SectionHeading({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "40%"], {
    ease: cubicBezier(...ease),
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0], {
    ease: cubicBezier(...ease),
  })

  return (
    <div ref={ref} className="relative py-24">
      <motion.h1
        style={{ x, opacity }}
        className="font-display text-5xl tracking-tight text-ink md:text-[8vmax]"
      >
        {children}
      </motion.h1>
    </div>
  )
}
