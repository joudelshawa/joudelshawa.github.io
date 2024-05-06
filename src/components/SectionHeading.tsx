import { cubicBezier, motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { ease } from "@/utils/framer"

type Props = {
  children: React.ReactNode
}

export default function SectionHeading({ children }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)

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
    <motion.h1
      style={{ x, opacity }}
      className="py-24 text-5xl md:text-[8vmax]"
      ref={ref}
    >
      {children}
    </motion.h1>
  )
}
