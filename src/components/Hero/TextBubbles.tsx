import { MotionValue, useMotionValueEvent } from "framer-motion"
import { useMemo, useRef, useState } from "react"

import textBubbleData from "@/data/text-bubbles"

import TextBubble from "./Textbubble"

type Props = {
  scrollYProgress: MotionValue<number>
}

const REVEAL_START = 0.1
const REVEAL_END = 0.92

export default function TextBubbles({ scrollYProgress }: Props) {
  const revealThresholds = useMemo(() => {
    const total = textBubbleData.length
    if (total <= 1) return [0]

    const step = 1 / (total - 1)
    return Array.from({ length: total }, (_, index) => index * step)
  }, [])

  const [visible, setVisible] = useState<boolean[]>(() =>
    textBubbleData.map(() => false),
  )
  const visibleRef = useRef(visible)

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const window = REVEAL_END - REVEAL_START
    const normalizedProgress = Math.max(
      0,
      Math.min(1, (value - REVEAL_START) / window),
    )

    const newVisible = revealThresholds.map((threshold) => {
      return normalizedProgress >= threshold
    })

    const didChange = newVisible.some(
      (isVisible, index) => isVisible !== visibleRef.current[index],
    )

    if (didChange) {
      visibleRef.current = newVisible
      setVisible(newVisible)
    }
  })

  return (
    <div
      id="textbubble-container"
      className="flex min-h-[30rem] flex-col justify-center gap-4"
    >
      {textBubbleData.map((data, index) => (
        <TextBubble visible={visible[index]} key={index} index={index}>
          {data}
        </TextBubble>
      ))}
    </div>
  )
}
