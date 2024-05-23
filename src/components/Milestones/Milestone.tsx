import { motion, useAnimate, useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'

import { cn } from '@/utils/misc'

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
      className="min-h-[6rem] grid-cols-[1fr_min-content_3fr] md:grid-cols-[1fr_min-content_6fr]"
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
  "timeline-end timeline-box text-base text-md md:text-xl shadow-none font-light"

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
        "group flex cursor-pointer items-center gap-2 border-transparent text-emerald-500 decoration-1 underline-offset-4 transition-colors hover:bg-emerald-500 hover:text-white "
      )} // @joud change these classes for clickable milestones
      href={milestone.href}
      target="_blank"
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-external-link stroke-[1.5px] text-white"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </Link>
  ) : (
    <div
      className={cn(baseTimelineEndClasses, "border-transparent shadow-none")}
    >
      {children}
    </div>
  )
