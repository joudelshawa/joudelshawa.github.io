import { motion, useAnimate, useInView } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

import { cn } from "@/utils/misc"
import MilestoneHoverImage from "./MilestoneHoverImage"

type Props = {
  milestone: Milestone
  index: number
  isFirst?: boolean
  isLast?: boolean
}

export default function Milestone({ milestone, isFirst, isLast }: Props) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: false })
  const [isHoveringMilestone, setIsHoveringMilestone] = useState(false)

  useEffect(() => {
    if (isInView) handleInView()
    else handleOutView()
  }, [isInView])

  async function handleInView() {
    if (!isFirst)
      await animate(".tl-line-top", { scaleY: 1 }, { duration: 0.3 })
    await animate(".tl-dot", { scale: 1 }, { duration: 0.3 })
    await animate(".tl-date", { opacity: 1 }, { duration: 0.3 })
    await animate(".tl-content", { opacity: 1 }, { duration: 0.3 })
  }

  async function handleOutView() {
    if (!isFirst)
      await animate(".tl-line-top", { scaleY: 0 }, { duration: 0.0000001 })
    await animate(".tl-dot", { scale: 0 }, { duration: 0.0000001 })
    await animate(".tl-date", { opacity: 0 }, { duration: 0.0000001 })
    await animate(".tl-content", { opacity: 0 }, { duration: 0.0000001 })
  }

  return (
    <>
      <motion.li
        ref={scope}
        key={milestone.text}
        className="grid min-h-[6rem] grid-cols-[2fr_min-content_5fr] md:grid-cols-[1fr_min-content_6fr]"
        // onMouseEnter={() => setIsHoveringMilestone(true)}
        // onMouseLeave={() => setIsHoveringMilestone(false)}
      >
        {/* {milestone.hoverImage && (
          <MilestoneHoverImage
            imageSrc={milestone.hoverImage}
            isVisible={isHoveringMilestone}
          />
        )} */}

        {/* Date column */}
        <div
          className="tl-date flex items-center justify-end pr-4 text-end font-mono text-sm text-ink-subtle md:text-base"
          style={{ opacity: 0 }}
        >
          {Array.isArray(milestone.date) ? (
            <>
              <span className="text-sage-dark">+ {milestone.date[0]}</span>
              <br />
              <span className="text-terracotta">- {milestone.date[1]}</span>
            </>
          ) : (
            <span>{milestone.date}</span>
          )}
        </div>

        {/* Center connector column */}
        <div className="relative flex flex-col items-center">
          {/* Top line */}
          {!isFirst && (
            <motion.div
              className="tl-line-top w-px flex-1 origin-top bg-cream-300"
              style={{ scaleY: 0 }}
            />
          )}
          {isFirst && <div className="flex-1" />}

          {/* Dot */}
          <motion.div
            className="tl-dot z-10 flex items-center justify-center"
            style={{ scale: 0 }}
          >
            <div className="size-2 rounded-full bg-terracotta md:size-3" />
          </motion.div>

          {/* Bottom line */}
          {!isLast ? (
            <div className="w-px flex-1 bg-cream-300" />
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Content column */}
        <Wrapper milestone={milestone}>{milestone.text}</Wrapper>
      </motion.li>
    </>
  )
}

const baseTimelineEndClasses =
  "tl-content flex items-center pl-4 py-3 text-base md:text-xl font-light text-ink-light"

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
      style={{ opacity: 0 }}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-external-link flex-shrink-0 stroke-[1.5px] text-terracotta"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </Link>
  ) : (
    <div className={cn(baseTimelineEndClasses)} style={{ opacity: 0 }}>
      {children}
    </div>
  )
