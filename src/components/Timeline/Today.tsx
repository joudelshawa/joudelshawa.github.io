import { motion, MotionValue, useAnimate, useInView, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import useScreenSize from '@/hooks/use-screen-size'
import { ease } from '@/utils/framer'
import { cn } from '@/utils/misc'

type Props = {
  sectionInView: boolean
  sectionScrollProgress: MotionValue<number>
}

export default function Today({ sectionInView, sectionScrollProgress }: Props) {
  const expandRef = useRef<HTMLDivElement>(null)
  const { pixelWidth, pixelHeight } = useScreenSize()

  const { scrollYProgress } = useScroll({
    target: expandRef,
    offset: ["start start", "center center"],
  })

  let vMax

  if (pixelWidth && pixelHeight) {
    const maxValue = Math.max(pixelWidth, pixelHeight) * 1.5

    vMax = maxValue
  }

  const scale = useTransform(scrollYProgress, [1, 0], [0, 1])

  return (
    <>
      <motion.div className="z-0">
        <motion.div ref={expandRef} />
        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.5,
              ease,
            },
          }}
          style={{
            scale,
            height: `${vMax}px`,
            width: `${vMax}px`,

            position: "absolute",
            x: "-50%",
            y: "-50%",
          }}
          className={cn("rounded-full bg-slate-900")}
        />
      </motion.div>
    </>
  )
}
