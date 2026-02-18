import { MotionValue, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"

import textBubbleData from "@/data/text-bubbles"

import TextBubble from "./Textbubble"

type Props = {
  scrollYProgress: MotionValue<number>
}

const REVEAL_START = 0.1
const REVEAL_END = 0.92
const REVEAL_DEADBAND = 0.02
const DIRECTION_EPSILON = 0.0005

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export default function TextBubbles({ scrollYProgress }: Props) {
  const totalBubbles = textBubbleData.length
  const hasBubbles = totalBubbles > 0
  const initialVisibleCount = hasBubbles ? 1 : 0

  const [revealedCount, setRevealedCount] = useState(initialVisibleCount)
  const revealedCountRef = useRef(initialVisibleCount)
  const lastProgressRef = useRef(0)
  const directionRef = useRef<1 | -1>(1)

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!hasBubbles) return

    const revealWindow = REVEAL_END - REVEAL_START
    const normalizedProgress = clamp((value - REVEAL_START) / revealWindow, 0, 1)
    const lastProgress = lastProgressRef.current
    lastProgressRef.current = normalizedProgress

    const delta = normalizedProgress - lastProgress

    if (Math.abs(delta) > DIRECTION_EPSILON) {
      directionRef.current = delta > 0 ? 1 : -1
    }

    const adjustedProgress = clamp(
      normalizedProgress + directionRef.current * REVEAL_DEADBAND,
      0,
      1,
    )
    const steppedCount = Math.floor(adjustedProgress * totalBubbles) + 1
    const nextRevealedCount = clamp(steppedCount, 1, totalBubbles)
    const didChange = nextRevealedCount !== revealedCountRef.current

    if (didChange) {
      revealedCountRef.current = nextRevealedCount
      setRevealedCount(nextRevealedCount)
    }
  })

  return (
    <div
      id="textbubble-container"
      className="flex min-h-[30rem] flex-col justify-center gap-4"
    >
      {textBubbleData.map((data, index) => (
        <TextBubble visible={index < revealedCount} key={index} index={index}>
          {data}
        </TextBubble>
      ))}
    </div>
  )
}
