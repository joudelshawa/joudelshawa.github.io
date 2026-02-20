import { motion } from "framer-motion"
import Link from "next/link"

import { cn } from "@/utils/misc"

type Props = {
  milestone: Milestone
  index: number
  isFirst?: boolean
  isLast?: boolean
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22, delay: 0.1 },
  },
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Milestone({ milestone, isFirst, isLast }: Props) {
  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="grid min-h-[6rem] grid-cols-[2fr_min-content_5fr] md:grid-cols-[1fr_min-content_6fr]"
    >
      {/* Date column */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-end pr-4 text-end font-mono text-sm text-ink-subtle md:text-base"
      >
        {Array.isArray(milestone.date) ? (
          <span className="flex flex-col gap-0.5 leading-snug">
            <span>{milestone.date[0]}</span>
            <span className="text-ink-ghost">— {milestone.date[1]}</span>
          </span>
        ) : (
          <span>{milestone.date}</span>
        )}
      </motion.div>

      {/* Center connector column */}
      <div className="relative flex flex-col items-center">
        {/* Top line */}
        {!isFirst ? (
          <motion.div
            variants={lineVariants}
            className="w-px flex-1 origin-top bg-cream-300"
          />
        ) : (
          <div className="flex-1" />
        )}

        {/* Dot */}
        <motion.div variants={dotVariants} className="z-10 flex items-center justify-center">
          <div className="size-2 rounded-full bg-terracotta shadow-[0_0_0_3px_rgba(251,248,243,1)] md:size-3" />
        </motion.div>

        {/* Bottom line */}
        {!isLast ? (
          <div className="w-px flex-1 bg-cream-300" />
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Content column */}
      <Wrapper milestone={milestone}>
        <motion.span variants={itemVariants}>{milestone.text}</motion.span>
      </Wrapper>
    </motion.li>
  )
}

const baseTimelineEndClasses =
  "flex items-center pl-4 py-3 text-base md:text-xl font-light text-ink-light"

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
        "group cursor-pointer gap-2 rounded-lg text-terracotta decoration-1 underline-offset-4 transition-colors hover:bg-terracotta/10"
      )}
      href={milestone.href}
      target="_blank"
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 stroke-[1.5px] opacity-60 transition-opacity group-hover:opacity-100"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </Link>
  ) : (
    <div className={cn(baseTimelineEndClasses)}>{children}</div>
  )
