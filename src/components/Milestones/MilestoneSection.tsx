import { motion, MotionValue, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import milestoneData from "@/data/milestones"
import useScreenSize from "@/hooks/use-screen-size"

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
    <section id="milestones" ref={ref} className="relative pb-24">
      <SectionHeading>Milestones</SectionHeading>

      <div className="mx-auto mb-12 flex w-full max-w-7xl items-center justify-center px-4 md:px-0">
        <div className="relative flex rounded-full bg-cream-200 p-1 shadow-inner border border-cream-300">
          <button
            type="button"
            onClick={() => setMode("focused")}
            className={`relative z-10 w-24 rounded-full py-2 font-mono text-xs tracking-wide transition-colors md:w-28 md:text-sm ${
              mode === "focused" ? "text-cream-50" : "text-ink-subtle hover:text-ink"
            }`}
          >
            Focused
          </button>
          <button
            type="button"
            onClick={() => setMode("all")}
            className={`relative z-10 w-24 rounded-full py-2 font-mono text-xs tracking-wide transition-colors md:w-28 md:text-sm ${
              mode === "all" ? "text-cream-50" : "text-ink-subtle hover:text-ink"
            }`}
          >
            Show all
          </button>
          
          {/* Sliding background */}
          <motion.div
            className="absolute bottom-1 top-1 z-0 rounded-full bg-terracotta shadow-sm"
            initial={false}
            animate={{
              left: mode === "focused" ? "4px" : "calc(50% + 2px)",
              width: "calc(50% - 6px)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {shouldRenderFocused ? (
          <motion.div
            key="focused-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <FocusedMilestoneTimeline milestones={focusedMilestones} />
          </motion.div>
        ) : (
          <motion.ul
            key="all-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
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
      </AnimatePresence>
    </section>
  )
}

function FocusedMilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useScreenSize()
  const [showScrollCue, setShowScrollCue] = useState(false)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((milestones.length - 1) / milestones.length) * 100}%`]
  )

  const sectionHeight = isMobile 
    ? Math.max(190, milestones.length * 100)
    : Math.max(190, milestones.length * 130)

  const cueOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0])
  const cueY = useTransform(scrollYProgress, [0, 0.18], [0, 8])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.14) {
      setShowScrollCue(false)
    }
  })

  useEffect(() => {
    setShowScrollCue(false)

    const timer = window.setTimeout(() => {
      if (scrollYProgress.get() <= 0.14) {
        setShowScrollCue(true)
      }
    }, 900)

    return () => window.clearTimeout(timer)
  }, [scrollYProgress])

  return (
    <div 
      ref={scrollRef} 
      className="relative" 
      style={{ height: `${sectionHeight}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-1 md:px-0">
        <YearBackground milestones={milestones} scrollYProgress={scrollYProgress} />
        <div className="mx-auto w-full max-w-7xl">
          <motion.ol 
            style={{ x }} 
            className="relative flex h-[76vh] w-max min-w-full -ml-[10vw] md:ml-0"
          >
            {/* The Line Container */}
            <div 
              className="pointer-events-none absolute top-1/2 h-[4px] -translate-y-1/2"
              style={{
                left: `${100 / (2 * milestones.length)}%`,
                right: `${100 / (2 * milestones.length)}%`,
              }}
            >
              {/* Background line */}
              <div className="absolute inset-0 bg-cream-300 rounded-full" />
              {/* Animated progress line */}
              <motion.div 
                className="absolute inset-y-0 left-0 bg-terracotta shadow origin-left rounded-full"
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
                isMobile={isMobile}
              />
            ))}
          </motion.ol>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center">
          <motion.div
            style={{ opacity: showScrollCue ? cueOpacity : 0, y: cueY }}
            initial={false}
            animate={
              showScrollCue
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 6, scale: 0.98 }
            }
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full rounded-br-md bg-cream-200/90 px-4 py-2 text-sm font-light text-ink shadow-sm shadow-ink/10"
            >
              Scroll to continue ↓
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function YearBackground({
  milestones,
  scrollYProgress,
}: {
  milestones: Milestone[]
  scrollYProgress: MotionValue<number>
}) {
  const getYear = (date: string | [string, string]) => {
    const dateStr = Array.isArray(date) ? date[0] : date
    return dateStr.split(" ").pop() || ""
  }

  const [yearState, setYearState] = useState({
    year: getYear(milestones[0].date),
    index: 0,
    direction: 1,
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      milestones.length - 1,
      Math.max(0, Math.round(latest * (milestones.length - 1)))
    )
    const newYear = getYear(milestones[newIndex].date)
    
    if (newYear !== yearState.year) {
      setYearState(prev => ({
        year: newYear,
        index: newIndex,
        direction: newIndex > prev.index ? 1 : -1
      }))
    } else if (newIndex !== yearState.index) {
      setYearState(prev => ({ ...prev, index: newIndex }))
    }
  })

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
      filter: "blur(8px)",
    }),
  }

  return (
    <div className="pointer-events-none absolute bottom-8 right-8 md:bottom-12 md:right-12 flex items-end justify-end">
      <div className="relative flex items-start justify-start font-display text-[25vw] font-bold leading-none text-cream-300 md:text-[18vw] tracking-normal pr-4 -mr-4 md:pr-8 md:-mr-8">
        {yearState.year.split("").map((char, i) => (
          <div key={i} className="relative inline-flex justify-center">
            {/* Invisible static character to maintain an exact width to prevent layout shifts */}
            <span className="invisible pointer-events-none">0</span>
            <AnimatePresence custom={yearState.direction}>
              <motion.div
                key={`${i}-${char}`}
                custom={yearState.direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {char}
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

type FocusedMilestoneCardProps = {
  milestone: Milestone
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  isMobile?: boolean
}

function FocusedMilestoneCard({
  milestone,
  index,
  total,
  scrollYProgress,
  isMobile,
}: FocusedMilestoneCardProps) {
  const denominator = Math.max(1, total - 1)
  const center = index / denominator
  const segmentStart = center - 0.2
  const segmentEnd = center + 0.2

  // Panel parallax — applied to content panels only, never to the li or dot
  const topPanelY = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [16, 0, -16])
  const bottomPanelY = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [-16, 0, 16])
  
  // Reduce horizontal parallax on mobile to prevent overlapping
  const parallaxX = isMobile ? 15 : 100
  const topPanelX = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [-parallaxX, 0, parallaxX])
  const bottomPanelX = useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [parallaxX, 0, -parallaxX])
  
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
      className="relative h-full w-[120vw] shrink-0 px-12 xs:w-[90vw] md:w-[35vw] lg:w-[25vw]"
    >
      {/* Dot and Date — static horizontally, tracks the line exactly */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <motion.div
          style={{ opacity: panelOpacity }}
          className={`absolute whitespace-nowrap font-mono text-xs font-medium text-terracotta md:text-sm ${
            imageOnTop ? "top-8 md:top-10" : "bottom-8 md:bottom-10"
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
          className="relative flex items-center justify-center size-4 rounded-full border-2 md:size-5"
        >
          <motion.div 
            className="size-1.5 rounded-full bg-cream-50 md:size-2"
            style={{ opacity: useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [0, 1, 0]) }}
          />
        </motion.div>
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
      className="relative mx-auto aspect-[4/3] h-full max-w-[70vw] md:max-w-[30rem] overflow-hidden rounded-xl border border-cream-300 bg-cream-200 shadow-sm"
    >
      <Image
        src={milestone.image}
        alt={milestone.text}
        fill
        sizes="(max-width: 768px) 70vw, 30rem"
        className="object-cover"
      />
    </motion.div>
  )
}

function FocusedContent({ 
  milestone,
}: { 
  milestone: Milestone
}) {
  return (
    <div className="mx-auto flex aspect-[4/3] h-full w-full max-w-[70vw] md:max-w-[30rem] flex-col justify-center px-2 md:px-4">
      <p className="max-w-[36ch] text-sm leading-relaxed md:text-lg font-medium text-ink">
        {milestone.text}
      </p>
      {milestone.href && (
        <Link
          href={milestone.href}
          target="_blank"
          rel="noopener noreferrer"
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
}
