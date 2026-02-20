import { motion, MotionValue, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

import milestoneData from "@/data/milestones"

import SectionHeading from "../SectionHeading"
import Milestone from "./Milestone"

export default function TimelineSection() {
  const [mode, setMode] = useState<"focused" | "all">("focused")
  const ref = useRef<HTMLDivElement>(null)

  const milestones = milestoneData
  const focusedMilestones = milestones.filter(
    (milestone) => milestone.isFocused && milestone.image
  )
  const shouldRenderFocused = mode === "focused" && focusedMilestones.length > 0

  return (
    <section id="milestones" ref={ref} className="relative px-4 pb-24">
      <SectionHeading>Milestones</SectionHeading>

      <div className="mx-auto mb-8 flex w-full max-w-7xl items-center justify-end gap-2 px-1">
        <button
          type="button"
          onClick={() => setMode("focused")}
          className={`rounded-full border px-4 py-2 font-mono text-xs tracking-wide transition-colors md:text-sm ${
            mode === "focused"
              ? "border-terracotta bg-terracotta text-cream-50"
              : "border-cream-300 bg-cream-100 text-ink-subtle hover:border-terracotta/50 hover:text-terracotta"
          }`}
        >
          Focused
        </button>
        <button
          type="button"
          onClick={() => setMode("all")}
          className={`rounded-full border px-4 py-2 font-mono text-xs tracking-wide transition-colors md:text-sm ${
            mode === "all"
              ? "border-terracotta bg-terracotta text-cream-50"
              : "border-cream-300 bg-cream-100 text-ink-subtle hover:border-terracotta/50 hover:text-terracotta"
          }`}
        >
          Show all
        </button>
      </div>

      {shouldRenderFocused ? (
        <FocusedMilestoneTimeline milestones={focusedMilestones} />
      ) : (
        <motion.ul
          key="milestones-container"
          className="relative mx-auto flex w-full max-w-7xl flex-col"
        >
          {milestones.map((milestone, index) => (
            <Milestone
              key={milestone.text}
              milestone={milestone}
              index={index}
              isFirst={index === 0}
              isLast={index === milestones.length - 1}
            />
          ))}
        </motion.ul>
      )}
    </section>
  )
}

function FocusedMilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((milestones.length - 1) / milestones.length) * 100}%`]
  )

  const sectionHeight = Math.max(190, milestones.length * 84)

  return (
    <div ref={scrollRef} className="relative" style={{ height: `${sectionHeight}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-1 md:px-0">
        <div className="mx-auto w-full max-w-7xl">
          <motion.ol style={{ x }} className="relative flex h-[76vh] w-max min-w-full">
            {/* The Line Container */}
            <div 
              className="pointer-events-none absolute top-1/2 h-[2px] -translate-y-1/2"
              style={{
                left: `${100 / (2 * milestones.length)}%`,
                right: `${100 / (2 * milestones.length)}%`,
              }}
            >
              {/* Background line */}
              <div className="absolute inset-0 bg-cream-300" />
              {/* Animated progress line */}
              <motion.div 
                className="absolute inset-y-0 left-0 bg-terracotta origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            {milestones.map((milestone, index) => (
              <FocusedMilestoneCard
                key={milestone.text}
                milestone={milestone}
                index={index}
                total={milestones.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.ol>
        </div>
      </div>
    </div>
  )
}

type FocusedMilestoneCardProps = {
  milestone: Milestone
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}

function FocusedMilestoneCard({
  milestone,
  index,
  total,
  scrollYProgress,
}: FocusedMilestoneCardProps) {
  const denominator = Math.max(1, total - 1)
  const center = index / denominator
  const segmentStart = Math.max(0, center - 0.2)
  const segmentEnd = Math.min(1, center + 0.2)

  // Panel parallax — applied to content panels only, never to the li or dot
  const topPanelY = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [16, 0, -16])
  const bottomPanelY = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [-16, 0, 16])
  const topPanelX = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [-100, 0, 100])
  const bottomPanelX = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [100, 0, -100])
  const panelOpacity = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [0.2, 1, 0.2])

  const imageScale = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [0.95, 1.02, 0.95])
  
  // Dot animation
  const dotScale = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [0.8, 1.3, 0.8])
  const dotColor = useTransform(
    scrollYProgress,
    [segmentStart, center, segmentEnd],
    ["#FBF8F3", "#C4654A", "#FBF8F3"] // cream-100 to terracotta
  )
  const dotBorderColor = useTransform(
    scrollYProgress,
    [segmentStart, center, segmentEnd],
    ["#EDE4D6", "#C4654A", "#EDE4D6"] // cream-300 to terracotta
  )

  const imageOnTop = index % 2 === 0

  const dateText = Array.isArray(milestone.date)
    ? `${milestone.date[0]} — ${milestone.date[1]}`
    : milestone.date

  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="relative h-full w-[86vw] shrink-0 px-2 xs:w-[68vw] md:w-[48vw] lg:w-[38vw]"
    >
      {/* Dot and Date — static horizontally, tracks the line exactly */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <motion.div
          style={{ opacity: panelOpacity }}
          className={`absolute whitespace-nowrap font-mono text-xs font-medium text-terracotta md:text-sm ${
            imageOnTop ? "top-6" : "bottom-6"
          }`}
        >
          {dateText}
        </motion.div>
        <motion.div
          style={{ 
            scale: dotScale,
            backgroundColor: dotColor,
            borderColor: dotBorderColor,
          }}
          className="size-3 rounded-full border-2 shadow-[0_0_0_6px_rgba(251,248,243,1)] md:size-4"
        />
      </div>

      <div className="relative h-full">
        {/* Top panel — moves up as you scroll past */}
        <motion.div
          style={{ y: topPanelY, x: topPanelX, opacity: panelOpacity }}
          className="absolute left-0 right-0 top-0 h-[calc(50%-2rem)] pb-4"
        >
          {imageOnTop ? (
            <FocusedImage milestone={milestone} imageScale={imageScale} />
          ) : (
            <FocusedContent milestone={milestone} />
          )}
        </motion.div>

        {/* Bottom panel — moves down as you scroll past */}
        <motion.div
          style={{ y: bottomPanelY, x: bottomPanelX, opacity: panelOpacity }}
          className="absolute bottom-0 left-0 right-0 h-[calc(50%-2rem)] pt-4"
        >
          {imageOnTop ? (
            <FocusedContent milestone={milestone} />
          ) : (
            <FocusedImage milestone={milestone} imageScale={imageScale} />
          )}
        </motion.div>
      </div>
    </motion.li>
  )
}

function FocusedImage({
  milestone,
  imageScale,
}: {
  milestone: Milestone
  imageScale: MotionValue<number>
}) {
  if (!milestone.image) return <div className="h-full rounded-xl bg-cream-200" />

  return (
    <motion.div
      style={{ scale: imageScale }}
      className="relative mx-auto aspect-[4/3] h-full max-w-[30rem] overflow-hidden rounded-xl border border-cream-300 bg-cream-200 shadow-sm"
    >
      <Image
        src={milestone.image}
        alt={milestone.text}
        fill
        sizes="(max-width: 768px) 92vw, 70vw"
        className="object-cover"
      />
    </motion.div>
  )
}

function FocusedContent({ milestone }: { milestone: Milestone }) {
  const content = (
    <div className="mx-auto flex aspect-[4/3] h-full w-full max-w-[30rem] flex-col justify-center px-2 md:px-4">
      <p className="max-w-[36ch] text-sm leading-relaxed text-ink md:text-lg font-medium">
        {milestone.text}
      </p>
      {milestone.href && (
        <Link
          href={milestone.href}
          target="_blank"
          className="mt-4 inline-flex w-max items-center gap-1.5 font-mono text-xs text-ink-subtle underline-offset-4 hover:text-terracotta hover:underline transition-colors"
        >
          View Project
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </Link>
      )}
    </div>
  )

  return content
}
