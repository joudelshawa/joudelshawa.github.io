import { motion, MotionValue, useTransform } from "framer-motion"
import { useMemo } from "react"

import { useIntroContext } from "@/contexts/introContext"

type Props = {
  scrollYProgress: MotionValue<number>
}

export default function HeroBackground({ scrollYProgress }: Props) {
  const { introComplete } = useIntroContext()

  // Parallax transforms for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9])
  const opacity1 = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: introComplete ? 0.2 : 1.5,
          duration: introComplete ? 0.6 : 2,
        },
      }}
      className="pointer-events-none absolute inset-0 z-[-1] h-[300vh] w-full overflow-hidden"
    >
      {/* Large terracotta arc — top right */}
      <motion.div
        style={{ y: y1, rotate: rotate1, opacity: opacity1 }}
        className="absolute -right-32 -top-20 h-[500px] w-[500px] md:-right-16 md:h-[700px] md:w-[700px]"
      >
        <svg viewBox="0 0 700 700" fill="none" className="h-full w-full">
          <circle
            cx="350"
            cy="350"
            r="280"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-terracotta/[0.08]"
          />
          <path
            d="M 350 70 A 280 280 0 0 1 630 350"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-terracotta/[0.15]"
          />
        </svg>
      </motion.div>

      {/* Small sage circle cluster — left side */}
      <motion.div
        style={{ y: y2, scale: scale1 }}
        className="absolute -left-12 top-[30vh] h-[200px] w-[200px] md:left-[8%] md:h-[300px] md:w-[300px]"
      >
        <svg viewBox="0 0 300 300" fill="none" className="h-full w-full">
          <circle cx="150" cy="150" r="100" className="fill-sage/[0.04]" />
          <circle
            cx="150"
            cy="150"
            r="100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-sage/[0.12]"
          />
          <circle
            cx="150"
            cy="150"
            r="60"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            className="text-sage/[0.10]"
          />
        </svg>
      </motion.div>

      {/* Diagonal line — crosses the viewport */}
      <motion.div
        style={{ y: y3 }}
        className="absolute left-0 top-[15vh] h-[200vh] w-full"
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <line
            x1="0"
            y1="600"
            x2="1440"
            y2="100"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-terracotta/[0.06]"
          />
          <line
            x1="0"
            y1="620"
            x2="1440"
            y2="120"
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-ink/[0.03]"
          />
        </svg>
      </motion.div>

      {/* Floating dot grid — mid-right */}
      <motion.div
        style={{ y: y1, rotate: rotate2 }}
        className="absolute right-[5%] top-[55vh] hidden md:block"
      >
        <DotGrid
          rows={5}
          cols={4}
          gap={18}
          dotSize={2.5}
          className="text-terracotta/[0.12]"
        />
      </motion.div>

      {/* Small accent dots — scattered */}
      <motion.div
        style={{ y: y2 }}
        className="absolute left-[15%] top-[70vh] hidden md:block"
      >
        <DotGrid
          rows={3}
          cols={3}
          gap={14}
          dotSize={2}
          className="text-sage/[0.10]"
        />
      </motion.div>

      {/* Large ethereal circle — bottom area */}
      <motion.div
        style={{ y: y3, opacity: opacity1 }}
        className="absolute -bottom-[40vh] left-[20%] h-[600px] w-[600px] md:h-[800px] md:w-[800px]"
      >
        <svg viewBox="0 0 800 800" fill="none" className="h-full w-full">
          <circle
            cx="400"
            cy="400"
            r="350"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-ink/[0.03]"
          />
          <circle
            cx="400"
            cy="400"
            r="250"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2 12"
            className="text-terracotta/[0.05]"
          />
        </svg>
      </motion.div>

      {/* Small terracotta arc — bottom-left accent */}
      <motion.div
        style={{ y: y2, rotate: rotate1 }}
        className="absolute bottom-[30vh] left-[5%] h-[120px] w-[120px] md:h-[180px] md:w-[180px]"
      >
        <svg viewBox="0 0 180 180" fill="none" className="h-full w-full">
          <path
            d="M 20 160 A 120 120 0 0 1 140 40"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-terracotta/[0.10]"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

function DotGrid({
  rows,
  cols,
  gap,
  dotSize,
  className,
}: {
  rows: number
  cols: number
  gap: number
  dotSize: number
  className?: string
}) {
  const dots = useMemo(() => {
    const result: { x: number; y: number; key: string }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result.push({ x: c * gap, y: r * gap, key: `${r}-${c}` })
      }
    }
    return result
  }, [rows, cols, gap])

  const width = (cols - 1) * gap + dotSize * 2
  const height = (rows - 1) * gap + dotSize * 2

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      className={className}
    >
      {dots.map((dot) => (
        <circle
          key={dot.key}
          cx={dot.x + dotSize}
          cy={dot.y + dotSize}
          r={dotSize}
        />
      ))}
    </svg>
  )
}
