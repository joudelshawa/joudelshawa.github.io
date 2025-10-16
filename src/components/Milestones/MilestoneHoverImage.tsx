import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

const IMAGE_WIDTH = 600
const IMAGE_HEIGHT = 400
const VERTICAL_OFFSET = IMAGE_HEIGHT // Position top edge so bottom aligns with milestone top + gap

interface MilestoneHoverImageProps {
  imageSrc: string
  isVisible: boolean
}

export default function MilestoneHoverImage({
  imageSrc,
  isVisible,
}: MilestoneHoverImageProps) {
  return null // Disable hover images for now

  const motionX = useMotionValue(0)

  useEffect(() => {
    if (!isVisible) return

    const updateMouseX = (e: MouseEvent) => {
      motionX.set(e.clientX - IMAGE_WIDTH)
    }

    window.addEventListener("mousemove", updateMouseX)
    return () => window.removeEventListener("mousemove", updateMouseX)
  }, [isVisible])

  console.log("rerender")

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none absolute z-[9997]"
          style={{
            x: motionX,
            top: -VERTICAL_OFFSET, // Position image height + gap above the milestone
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <div
            className="overflow-hidden rounded-lg border border-white/20 p-4 shadow-lg backdrop-blur-md"
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
            }}
          >
            <Image
              src={imageSrc}
              alt="Milestone image"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
