import { motion, useAnimate, useInView } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef } from "react"

import { milestoneVariants } from "@/utils/framer"
import { cn } from "@/utils/misc"

type Props = {
  milestone: Milestone
  index: number
  isFirst?: boolean
  isLast?: boolean
}

export default function Milestone({ milestone, isFirst }: Props) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  useEffect(() => {
    if (isInView) handleInView()
  }, [isInView])

  async function handleInView() {
    if (!isFirst) await animate(".top-line", { scaleY: 1 }, { duration: 0.3 })
    await animate(".timeline-middle", { scale: 1 }, { duration: 0.3 })
    await animate(".timeline-start", { opacity: 1 }, { duration: 0.3 })
    await animate(".timeline-end", { opacity: 1 }, { duration: 0.3 })
  }

  return (
    <motion.li
      ref={scope}
      key={milestone.text}
      className="min-h-[6rem] grid-cols-[1fr_min-content_2fr] md:grid-cols-[1fr_min-content_6fr]" // @joud change this value [10rem] to set the gap between milestones
    >
      <div className="timeline-start justify-self-start" style={{ opacity: 0 }}>
        {milestone.date}
      </div>
      {!isFirst && (
        <motion.hr
          className="top-line"
          style={{
            scaleY: 0,
          }}
        />
      )}
      <motion.div
        className="timeline-middle"
        style={{
          scale: 0,
        }}
      >
        <motion.div className="h-3 w-3 rounded-full bg-black" />
      </motion.div>
      <Wrapper milestone={milestone}>{milestone.text}</Wrapper>
      <motion.hr className="bottom-line" />
    </motion.li>
  )
}

const baseTimelineEndClasses =
  "timeline-end timeline-box text-base md:text-lg xl:text-xl"

const Wrapper = ({
  children,
  milestone,
}: {
  children: React.ReactNode
  milestone: Milestone
}) =>
  milestone.href ? (
    <Link
      className={cn(
        baseTimelineEndClasses,
        "cursor-pointer border border-rose-400 transition-all hover:bg-rose-500 hover:text-white hover:shadow-xl"
      )} // @joud change these classes for clickable milestones
      href={milestone.href}
      target="_blank"
    >
      {children}
    </Link>
  ) : (
    <div className={baseTimelineEndClasses}>{children}</div>
  )
