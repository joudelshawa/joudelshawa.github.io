import { useEffect, useRef } from "react"

const PARTICLE_SIZE = 14
const SPAWN_DISTANCE = 28
const PARTICLE_DURATION = 900

// Warm editorial palette colors for mouse trail
const TRAIL_COLORS = [
  "rgba(196, 101, 74, 0.25)", // terracotta
  "rgba(212, 131, 108, 0.2)", // terracotta light
  "rgba(122, 139, 111, 0.25)", // sage
  "rgba(152, 168, 142, 0.2)", // sage light
  "rgba(217, 164, 148, 0.22)", // terracotta muted
  "rgba(184, 196, 176, 0.2)", // sage muted
]

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
        filter: blur(1px);
      `

      container.appendChild(particle)

      particle
        .animate(
          [
            { transform: "scale(1.1)", opacity: 0.7 },
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
        const color =
          TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]
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
          const color =
            TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]
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
