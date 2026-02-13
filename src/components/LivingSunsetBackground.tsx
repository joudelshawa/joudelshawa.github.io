import { motion, motionValue, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

// ─── Blob configuration ──────────────────────────────────────────────────────

interface BlobConfig {
  label: string
  gradient: string
  fullSize: number // vmax at rest
  restX: number // px offset from viewport center
  restY: number // px offset from viewport center
  idleDrift: number // px radius of idle loop
  idleSpeed: number // seconds per idle loop
  mouseInfluence: number // multiplier on smoothed mouse offset
  blur: number // blur amount in px
}

const globalParams = {
  size: 1, // Multiplies blob fullSize (1 = current size)
  blurIntensity: 1, // Multiplies blur amount (1 = current blur)
  drift: 1, // Multiplies idleDrift radius (1 = current drift distance)
  speed: 1, // Multiplies animation speed (1 = current speed, 2 = twice as fast)
  mouse: 1, // Multiplies mouse influence (1 = current responsiveness)
}

// Apply global multipliers to all blob configs
const BLOBS: BlobConfig[] = [
  {
    label: "SUN",
    gradient:
      "radial-gradient(circle at 30% 30%, rgba(255, 210, 90, 0.6) 0%, rgba(255, 180, 60, 0.35) 35%, transparent 70%)",
    fullSize: 60,
    restX: 280,
    restY: -200,
    idleDrift: 30,
    idleSpeed: 8,
    mouseInfluence: 0.08,
    blur: 80,
  },
  {
    label: "ORANGE",
    gradient:
      "radial-gradient(circle at 40% 20%, rgba(255, 140, 50, 0.55) 0%, rgba(255, 100, 40, 0.3) 40%, transparent 72%)",
    fullSize: 55,
    restX: -320,
    restY: 60,
    idleDrift: 25,
    idleSpeed: 10,
    mouseInfluence: 0.06,
    blur: 90,
  },
  {
    label: "TERRA",
    gradient:
      "radial-gradient(circle at 35% 35%, rgba(220, 100, 80, 0.5) 0%, rgba(190, 90, 70, 0.25) 40%, transparent 68%)",
    fullSize: 48,
    restX: 350,
    restY: 180,
    idleDrift: 20,
    idleSpeed: 12,
    mouseInfluence: 0.1,
    blur: 75,
  },
  {
    label: "ROSE",
    gradient:
      "radial-gradient(circle at 25% 25%, rgba(255, 150, 160, 0.45) 0%, rgba(255, 120, 140, 0.22) 45%, transparent 70%)",
    fullSize: 42,
    restX: -200,
    restY: -150,
    idleDrift: 22,
    idleSpeed: 9,
    mouseInfluence: 0.12,
    blur: 85,
  },
  {
    label: "SAGE",
    gradient:
      "radial-gradient(circle at 30% 40%, rgba(140, 180, 140, 0.4) 0%, rgba(110, 160, 120, 0.2) 50%, transparent 75%)",
    fullSize: 45,
    restX: -300,
    restY: 250,
    idleDrift: 28,
    idleSpeed: 11,
    mouseInfluence: 0.05,
    blur: 70,
  },
].map((blob) => ({
  ...blob,
  fullSize: blob.fullSize * globalParams.size,
  blur: blob.blur * globalParams.blurIntensity,
  idleDrift: blob.idleDrift * globalParams.drift,
  idleSpeed: blob.idleSpeed / globalParams.speed, // Inverse: higher speed = shorter duration
  mouseInfluence: blob.mouseInfluence * globalParams.mouse,
}))

// Manual lerp factor for mouse smoothing per frame (~60fps)
// 0.04 = very smooth/heavy, 0.12 = responsive but still smooth
const MOUSE_LERP = 0.06

// ─── Single Blob (pure presentational — just holds motion values) ────────────

type MV = ReturnType<typeof motionValue<number>>

function Blob({
  config,
  blobX,
  blobY,
  scrollOpacity,
}: {
  config: BlobConfig
  blobX: MV
  blobY: MV
  scrollOpacity: MV
}) {
  return (
    <motion.div
      style={{
        x: blobX,
        y: blobY,
        opacity: scrollOpacity,
        width: `${config.fullSize}vmax`,
        height: `${config.fullSize}vmax`,
        left: "50%",
        top: "50%",
        filter: `blur(${config.blur}px)`,
        background: config.gradient,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
    />
  )
}

// ─── Main background ─────────────────────────────────────────────────────────

export default function LivingSunsetBackground() {
  // Track scroll progress for opacity fade
  const { scrollYProgress } = useScroll()
  // Opacity goes from 1 (top) down to 0.15 (bottom) as user scrolls
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15])

  // One pair of motion values per blob — created once via ref, set directly from rAF loop
  const blobMotion = useRef(
    BLOBS.map(() => ({
      x: motionValue(0),
      y: motionValue(0),
      opacity: motionValue(1),
    }))
  )

  // Mutable refs for the animation loop (no re-renders)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })
  const startTime = useRef(0)
  const rafId = useRef(0)

  // Mouse listener — just updates target, no motion values
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = e.clientX - window.innerWidth / 2
      mouseTarget.current.y = e.clientY - window.innerHeight / 2
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  // Single unified rAF loop — drives ALL blob positions
  useEffect(() => {
    startTime.current = performance.now()

    const tick = () => {
      const elapsed = (performance.now() - startTime.current) / 1000

      // Lerp mouse position toward target (frame-rate independent feel)
      mouseCurrent.current.x +=
        (mouseTarget.current.x - mouseCurrent.current.x) * MOUSE_LERP
      mouseCurrent.current.y +=
        (mouseTarget.current.y - mouseCurrent.current.y) * MOUSE_LERP

      // Update each blob
      for (let i = 0; i < BLOBS.length; i++) {
        const cfg = BLOBS[i]

        // Idle drift — lissajous pattern (different X/Y periods for organic feel)
        const idlePhase = (elapsed * Math.PI * 2) / cfg.idleSpeed
        const idleX = Math.sin(idlePhase) * cfg.idleDrift
        const idleY = Math.cos(idlePhase * 0.77) * cfg.idleDrift * 0.7

        // Mouse contribution (scaled per blob)
        const mx = mouseCurrent.current.x * cfg.mouseInfluence
        const my = mouseCurrent.current.y * cfg.mouseInfluence

        // Final position = rest + idle + mouse
        blobMotion.current[i].x.set(cfg.restX + idleX + mx)
        blobMotion.current[i].y.set(cfg.restY + idleY + my)
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #FBF8F3 0%, #F5EFE6 50%, #EDE4D6 100%)",
      }}
    >
      {BLOBS.map((blob, i) => (
        <Blob
          key={blob.label}
          config={blob}
          blobX={blobMotion.current[i].x}
          blobY={blobMotion.current[i].y}
          scrollOpacity={scrollOpacity}
        />
      ))}
    </div>
  )
}
