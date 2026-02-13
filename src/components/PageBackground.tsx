import { motion, useScroll, useTransform } from "framer-motion"

/**
 * Full-page parallax background. Sits behind all content as a fixed layer.
 * A few deliberate geometric forms drift at different speeds as you scroll,
 * creating depth without clutter.
 */
export default function PageBackground() {
  const { scrollYProgress } = useScroll()

  // Each layer moves at a different rate — slower = further "away"
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-60vh"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-35vh"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0vh", "-90vh"])
  const y4 = useTransform(scrollYProgress, [0, 1], ["0vh", "-50vh"])

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 25])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15])

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {/* ─── 1. Large sweeping arc — upper right ─── */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -right-[8vw] top-[5vh] h-[45vmax] w-[45vmax]"
      >
        <svg viewBox="0 0 600 600" fill="none" className="h-full w-full">
          {/* Outer arc — only the top-right quarter */}
          <path
            d="M 300 30 A 270 270 0 0 1 570 300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-terracotta/[0.35]"
          />
          {/* Inner echo, offset and thinner */}
          <path
            d="M 300 90 A 210 210 0 0 1 510 300"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            className="text-terracotta/[0.20]"
          />
        </svg>
      </motion.div>

      {/* ─── 2. Three offset rings — left side, mid-page ─── */}
      <motion.div
        style={{ y: y2 }}
        className="absolute -left-[4vw] top-[90vh] h-[30vmax] w-[30vmax] md:left-[6vw]"
      >
        <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="currentColor"
            strokeWidth="1"
            className="text-sage/[0.30]"
          />
          <circle
            cx="220"
            cy="180"
            r="110"
            stroke="currentColor"
            strokeWidth="0.75"
            className="text-sage/[0.18]"
          />
          <circle
            cx="180"
            cy="220"
            r="70"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-sage/[0.10]"
          />
        </svg>
      </motion.div>

      {/* ─── 3. Single thin diagonal — full viewport cross ─── */}
      <motion.div
        style={{ y: y3 }}
        className="absolute left-0 top-[40vh] h-[120vh] w-full"
      >
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <line
            x1="0"
            y1="700"
            x2="1440"
            y2="80"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-terracotta/[0.25]"
          />
        </svg>
      </motion.div>

      {/* ─── 4. Small precise circle — right side, further down ─── */}
      <motion.div
        style={{ y: y4, rotate: rotate2 }}
        className="absolute right-[8vw] top-[200vh] h-[18vmax] w-[18vmax]"
      >
        <svg viewBox="0 0 240 240" fill="none" className="h-full w-full">
          <circle
            cx="120"
            cy="120"
            r="100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink/[0.15]"
          />
          {/* Small filled dot at the top of the circle */}
          <circle cx="120" cy="20" r="4" className="fill-terracotta/[0.50]" />
        </svg>
      </motion.div>

      {/* ─── 5. Subtle arc — bottom of page, near milestones/footer ─── */}
      <motion.div
        style={{ y: y2, rotate: rotate1 }}
        className="absolute -left-[12vw] top-[320vh] h-[35vmax] w-[35vmax]"
      >
        <svg viewBox="0 0 500 500" fill="none" className="h-full w-full">
          <path
            d="M 50 450 A 350 350 0 0 1 400 100"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            className="text-terracotta/[0.25]"
          />
        </svg>
      </motion.div>
    </div>
  )
}
