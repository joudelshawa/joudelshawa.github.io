import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function MouseTrail() {
  const [mounted, setMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Motion values - start offscreen
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth spring animation
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 700 })
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 700 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      console.log(e.clientX, e.clientY)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('a, button, [role="button"]') !== null
      setIsHovering(isInteractive)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] h-6 w-6 rounded-full bg-black"
      style={{
        left: cursorX,
        top: cursorY,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        scale: { type: "spring", damping: 20, stiffness: 300 },
      }}
    />
  )
}
