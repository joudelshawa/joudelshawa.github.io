import { motion, motionValue, useScroll, useTransform } from "framer-motion"
import { useRouter } from "next/router"
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
  depth: number // Parallax depth multiplier
}

const globalParams = {
  size: 2, // Multiplies blob fullSize (1 = current size)
  blurIntensity: 0.35, // Multiplies blur amount (1 = current blur)
  drift:5.9, // Multiplies idleDrift radius (1 = current drift distance)
  speed: 1.25, // Multiplies animation speed (1 = current speed, 2 = twice as fast)
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
    depth: 1.1,
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
    depth: 0.85,
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
    depth: 1,
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
    depth: 1.2,
  },
  {
    label: "SAGE",
    gradient:
      "radial-gradient(circle at 30% 40%, rgba(196, 166, 138, 0.3) 0%, rgba(170, 140, 118, 0.14) 52%, transparent 76%)",
    fullSize: 45,
    restX: -300,
    restY: 250,
    idleDrift: 28,
    idleSpeed: 11,
    mouseInfluence: 0.05,
    blur: 70,
    depth: 0.7,
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
const SCROLL_PARALLAX_RANGE = 320
const BREATH_SPEED = 0.32
const BREATH_AMPLITUDE = 0.09
const GRAIN_OPACITY = 0.32

// ─── Single Blob (pure presentational — just holds motion values) ────────────

type MV = ReturnType<typeof motionValue<number>>

function Blob({
  config,
  blobX,
  blobY,
  breathe,
  intensity,
  scrollOpacity,
}: {
  config: BlobConfig
  blobX: MV
  blobY: MV
  breathe: MV
  intensity: MV
  scrollOpacity: MV
}) {
  const compositeOpacity = useTransform(
    [scrollOpacity, breathe, intensity],
    (values) => {
      const [scroll, breath, active] = values as number[]
      return scroll * (0.18 + active * 0.82) * (0.78 + breath * 0.22)
    }
  )

  return (
    <motion.div
      style={{
        x: blobX,
        y: blobY,
        opacity: compositeOpacity,
        scale: breathe,
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
  const router = useRouter()
  const isProjectPage = router.pathname.startsWith("/projects/")

  // Track scroll progress for opacity fade
  const { scrollYProgress } = useScroll()
  // Opacity goes from 1 (top) down to 0.15 (bottom) as user scrolls
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15])

  // One pair of motion values per blob — created once via ref, set directly from rAF loop
  const blobMotion = useRef(
    BLOBS.map(() => ({
      x: motionValue(0),
      y: motionValue(0),
      breathe: motionValue(1),
    }))
  )
  const grainX = useRef(motionValue(0))
  const grainY = useRef(motionValue(0))
  const intensity = useRef(motionValue(isProjectPage ? 0.28 : 1))
  const currentIntensity = useRef(isProjectPage ? 0.28 : 1)
  const targetIntensity = useRef(isProjectPage ? 0.28 : 1)

  // Mutable refs for the animation loop (no re-renders)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })
  const startTime = useRef(0)
  const rafId = useRef(0)

  useEffect(() => {
    targetIntensity.current = isProjectPage ? 0.28 : 1
  }, [isProjectPage])

  // Mouse listener — just updates target, no motion values
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = e.clientX - window.innerWidth / 2
      mouseTarget.current.y = e.clientY - window.innerHeight / 2
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [scrollYProgress])

  // Single unified rAF loop — drives ALL blob positions
  useEffect(() => {
    startTime.current = performance.now()

    const tick = () => {
      const elapsed = (performance.now() - startTime.current) / 1000
      const scrollProgress = scrollYProgress.get()
      const centeredProgress = scrollProgress - 0.5

      currentIntensity.current +=
        (targetIntensity.current - currentIntensity.current) * 0.045
      intensity.current.set(currentIntensity.current)

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

        // Scroll depth parallax (different travel per blob)
        const depthIntensity = 0.35 + currentIntensity.current * 0.65
        const scrollY =
          centeredProgress * SCROLL_PARALLAX_RANGE * cfg.depth * depthIntensity
        const scrollX =
          centeredProgress *
          (SCROLL_PARALLAX_RANGE * 0.22) *
          cfg.depth *
          depthIntensity

        // Very gentle breathing (size + opacity)
        const breathe =
          0.92 +
          (Math.sin(elapsed * BREATH_SPEED + i * 1.33) + 1) *
            BREATH_AMPLITUDE *
            (0.45 + currentIntensity.current * 0.55)

        // Final position = rest + idle + mouse
        blobMotion.current[i].x.set(cfg.restX + idleX + mx + scrollX)
        blobMotion.current[i].y.set(cfg.restY + idleY + my + scrollY)
        blobMotion.current[i].breathe.set(breathe)
      }

      // Subtle grain drift (keeps texture from feeling frozen)
      grainX.current.set(Math.sin(elapsed * 0.14) * 28)
      grainY.current.set(Math.cos(elapsed * 0.11) * 22)

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
          breathe={blobMotion.current[i].breathe}
          intensity={intensity.current}
          scrollOpacity={scrollOpacity}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          x: grainX.current,
          y: grainY.current,
          opacity: useTransform(intensity.current, (v) => GRAIN_OPACITY * (0.35 + v * 0.65)),
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  )
}
