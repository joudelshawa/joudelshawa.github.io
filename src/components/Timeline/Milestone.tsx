import { motion, useAnimate, useInView } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"

import { cn } from "@/utils/misc"

type Props = {
  milestone: Milestone
  index: number
  isFirst?: boolean
  isLast?: boolean
}

export default function Milestone({ milestone, isFirst, isLast }: Props) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: false })

  useEffect(() => {
    if (isInView) handleInView()
    else handleOutView()
  }, [isInView])

  async function handleInView() {
    if (!isFirst) await animate(".top-line", { scaleY: 1 }, { duration: 0.3 })
    await animate(".timeline-middle", { scale: 1 }, { duration: 0.3 })
    await animate(".timeline-start", { opacity: 1 }, { duration: 0.3 })
    await animate(".timeline-end", { opacity: 1 }, { duration: 0.3 })
  }

  async function handleOutView() {
    if (!isFirst)
      await animate(".top-line", { scaleY: 0 }, { duration: 0.0000001 })
    await animate(".timeline-middle", { scale: 0 }, { duration: 0.0000001 })
    await animate(".timeline-start", { opacity: 0 }, { duration: 0.0000001 })
    await animate(".timeline-end", { opacity: 0 }, { duration: 0.0000001 })
  }

  return (
    <motion.li
      ref={scope}
      key={milestone.text}
      className="min-h-[6rem] grid-cols-[1fr_min-content_2fr] md:grid-cols-[1fr_min-content_6fr]" // @joud change this value [10rem] to set the gap between milestones
    >
      <div
        className="md:text-md timeline-start justify-self-start text-end font-mono text-sm"
        style={{ opacity: 0 }}
      >
        {Array.isArray(milestone.date) ? (
          <>
            <span className="text-emerald-800">+ {milestone.date[0]}</span>
            <br />
            <span className="text-rose-800">- {milestone.date[1]}</span>
          </>
        ) : (
          <span>{milestone.date}</span>
        )}
      </div>
      {!isFirst && (
        <motion.hr
          className="top-line bg-slate-100"
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
        <motion.div className="size-2 rounded-full bg-slate-700 md:size-3" />
      </motion.div>
      <Wrapper milestone={milestone}>{milestone.text}</Wrapper>
      {!isLast && <motion.hr className="bottom-line bg-slate-100" />}
    </motion.li>
  )
}

const baseTimelineEndClasses =
  "timeline-end timeline-box text-base text-md md:text-xl border"

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
        "cursor-pointer border-transparent shadow-lg shadow-rose-100 transition-all hover:bg-rose-500 hover:text-white "
      )} // @joud change these classes for clickable milestones
      href={milestone.href}
      target="_blank"
    >
      {children}
    </Link>
  ) : (
    <div
      className={cn(baseTimelineEndClasses, "border-transparent shadow-none")}
    >
      {children}
    </div>
  )
