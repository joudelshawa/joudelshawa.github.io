import {
  cubicBezier,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
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

  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    console.log(latest)
  )

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "50vw"], {
    ease: cubicBezier(...ease),
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.h1 style={{ x, opacity }} className="text-[8vw]" ref={ref}>
      {children}
    </motion.h1>
  )
}
