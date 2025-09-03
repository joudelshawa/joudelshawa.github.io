import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { gen } from "culler"

interface TrailParticle {
  id: number
  x: number
  y: number
  color: string
  createdAt: number
}

const PARTICLE_SIZE = 24 // 16px = h-4 w-4 in Tailwind

export default function MouseTrail() {
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([])

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  useEffect(() => {
    let lastParticleTime = 0
    const throttleDelay = 25

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12) // Center the 6x6 (24px) cursor
      mouseY.set(e.clientY - 12)

      // Throttle particle creation
      const now = Date.now()
      if (now - lastParticleTime > throttleDelay) {
        const newParticle: TrailParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: gen({
            type: "rgb",
            minR: 212,
            minG: 212,
            minB: 212,
          }),
          createdAt: now,
        }

        setTrailParticles((prev) => [...prev, newParticle])
        lastParticleTime = now
      }
    }

    console.log("rerender")

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [mouseX, mouseY])

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setTrailParticles((prev) =>
        prev.filter((particle) => now - particle.createdAt < 1000)
      )
    }, 500) // Clean up every 500ms

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {trailParticles.map((particle) => {
        return (
          <motion.div
            key={particle.id}
            className="pointer-events-none fixed z-[9998] rounded-full"
            style={{
              left: particle.x - PARTICLE_SIZE / 2,
              top: particle.y - PARTICLE_SIZE / 2,
              width: PARTICLE_SIZE,
              height: PARTICLE_SIZE,
              backgroundColor: particle.color,
            }}
            initial={{
              scale: 1.1,
              opacity: 0.8,
            }}
            animate={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        )
      })}
    </>
  )
}
