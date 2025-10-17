import { useEffect, useRef } from "react"
import { gen } from "culler"

const PARTICLE_SIZE = 28
const SPAWN_DISTANCE = 32
const PARTICLE_DURATION = 1000

export default function MouseTrail() {
  const lastSpawnRef = useRef<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const spawnParticle = (x: number, y: number, color: string) => {
      const particle = document.createElement("div")
      particle.className = "pointer-events-none absolute rounded-full"
      particle.style.cssText = `
        left: ${x - PARTICLE_SIZE / 2}px;
        top: ${y - PARTICLE_SIZE / 2}px;
        width: ${PARTICLE_SIZE}px;
        height: ${PARTICLE_SIZE}px;
        background-color: ${color};
      `

      container.appendChild(particle)

      particle
        .animate(
          [
            { transform: "scale(1.1)", opacity: 0.8 },
            { transform: "scale(0)", opacity: 0 },
          ],
          { duration: PARTICLE_DURATION, easing: "ease-out", fill: "forwards" }
        )
        .finished.then(() => particle.remove())
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e

      if (!lastSpawnRef.current) {
        lastSpawnRef.current = { x, y }
        const color = gen({
          type: "rgba",
          minR: 155,
          minG: 155,
          minB: 155,
          a: 0.4,
        })
        spawnParticle(x, y, color)
        return
      }

      const lastSpawn = lastSpawnRef.current
      const deltaX = x - lastSpawn.x
      const deltaY = y - lastSpawn.y
      const distance = Math.hypot(deltaX, deltaY)

      if (distance >= SPAWN_DISTANCE) {
        const steps = Math.floor(distance / SPAWN_DISTANCE)
        const unitX = deltaX / distance
        const unitY = deltaY / distance

        for (let step = 1; step <= steps; step++) {
          const spawnX = lastSpawn.x + unitX * SPAWN_DISTANCE * step
          const spawnY = lastSpawn.y + unitY * SPAWN_DISTANCE * step
          const color = gen({
            type: "rgba",
            minR: 155,
            minG: 155,
            minB: 155,
            a: 0.4,
          })
          spawnParticle(spawnX, spawnY, color)
        }

        lastSpawnRef.current = { x, y }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      lastSpawnRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden
    />
  )
}
