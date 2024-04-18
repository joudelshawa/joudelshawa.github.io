import {
  motion,
  MotionValue,
  useAnimate,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

import useScreenSize from "@/hooks/use-screen-size"
import { ease } from "@/utils/framer"
import { cn } from "@/utils/misc"

type Props = {
  sectionInView: boolean
  sectionScrollProgress: MotionValue<number>
}

export default function Today({ sectionInView, sectionScrollProgress }: Props) {
  const expandRef = useRef<HTMLDivElement>(null)
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "0px 0px -50% 0px" })
  const { pixelWidth, pixelHeight } = useScreenSize()

  useEffect(() => {
    if (isInView) {
      handleInView()
    }
  }, [isInView])

  async function handleInView() {
    await animate(".top-line", { scaleY: 1 }, { duration: 0.3 })
    await animate(".timeline-middle", { scale: 1 }, { duration: 0.3 })
    await animate(".timeline-start", { opacity: 1 }, { duration: 0.3 })
  }

  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ["start start", "center center"],
  })

  let vMax

  if (pixelWidth && pixelHeight) {
    const maxValue = Math.max(pixelWidth, pixelHeight) * 1.5

    vMax = maxValue / 12
  }

  const scale = useTransform(scrollYProgress, [1, 0], [1, vMax])

  return (
    <motion.li
      ref={scope}
      className=" min-h-[6rem] grid-cols-[1fr_min-content_2fr] md:grid-cols-[1fr_min-content_6fr] "
    >
      <motion.div
        className="timeline-start justify-self-start"
        style={{ opacity: 0 }}
      >
        Today
      </motion.div>

      <motion.hr
        className="top-line"
        style={{
          scaleY: 0,
        }}
      />

      <motion.div className="timeline-middle z-0">
        <motion.div ref={expandRef} className="min-h-3 min-w-3 rounded-full" />
        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.5,
              ease,
            },
          }}
          style={{ scale }}
          className={cn(
            "h-3 w-3 rounded-full bg-amber-500 filter",
            isInView || (!sectionInView && sectionScrollProgress.get() > 0.5)
              ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : "static -mt-3"
          )}
        ></motion.div>
      </motion.div>
    </motion.li>
  )
}
