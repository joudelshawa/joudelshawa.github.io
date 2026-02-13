import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

type Props = {
  variant?: "arc" | "dots" | "line"
}

export default function SectionDivider({ variant = "arc" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"])
  const dotScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const arcRotate = useTransform(scrollYProgress, [0, 1], [-10, 10])

  if (variant === "line") {
    return (
      <div ref={ref} className="relative mx-auto w-full max-w-7xl px-4 py-12">
        <div className="flex items-center gap-4">
          <motion.div
            style={{ width: lineWidth }}
            className="h-px bg-gradient-to-r from-transparent via-terracotta/20 to-transparent"
          />
          <motion.div
            style={{ scale: dotScale }}
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta/30"
          />
          <motion.div
            style={{ width: lineWidth }}
            className="h-px bg-gradient-to-l from-transparent via-ink/[0.06] to-transparent"
          />
        </div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div ref={ref} className="relative mx-auto w-full max-w-7xl px-4 py-16">
        <div className="flex items-center justify-center gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              style={{
                scale: dotScale,
                backgroundColor:
                  i === 2
                    ? "rgba(196, 101, 74, 0.35)"
                    : i % 2 === 0
                    ? "rgba(122, 139, 111, 0.2)"
                    : "rgba(26, 26, 26, 0.08)",
              }}
              className="h-1 w-1 rounded-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              viewport={{ once: false }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Default: arc variant
  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 py-8"
    >
      <div className="flex items-center justify-center">
        <motion.svg
          style={{ rotate: arcRotate }}
          viewBox="0 0 200 40"
          fill="none"
          className="h-10 w-48 md:w-64"
        >
          <path
            d="M 10 35 Q 100 -5 190 35"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeLinecap="round"
            className="text-terracotta/[0.15]"
          />
          <circle cx="100" cy="12" r="2" className="fill-terracotta/[0.25]" />
        </motion.svg>
      </div>
    </div>
  )
}
