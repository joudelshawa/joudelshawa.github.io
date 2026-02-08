import { AnimatePresence, AnimationProps, motion } from "framer-motion"
import { useState } from "react"

import { ease } from "@/utils/framer"

export default function ContactDetails() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("jelshawa@gmail.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div
      style={{
        textTransform: "none",
        padding:
          "clamp(1.5rem, 6vh, 6rem) clamp(1.5rem, 5vw, 2.5rem) clamp(2rem, 8vh, 4rem)",
        gap: "clamp(1rem, 4vh, 2rem)",
      }}
      className="flex h-full flex-col justify-between text-cream-100"
    >
      <motion.div exit="hidden" variants={liVariants}>
        <p
          className="font-mono uppercase tracking-widest text-ink-faint"
          style={{ fontSize: "clamp(0.65rem, 1.6vh, 0.85rem)" }}
        >
          Get in touch!
        </p>
        <p
          className="text-cream-300"
          style={{ fontSize: "clamp(0.9rem, 2.2vh, 1.25rem)", lineHeight: 1.4 }}
        >
          Feel free to reach out, I&apos;m always excited to learn, collaborate,
          and contribute to impactful projects! 💬
        </p>
      </motion.div>
      <motion.ul
        variants={ulVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="font-display"
        style={{
          fontSize: "clamp(2rem, 6vh, 3rem)",
          gap: "clamp(1.5rem, 4vh, 2.5rem)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <motion.li variants={liVariants}>
          <a target="_blank" href="https://www.linkedin.com/in/joudelshawa">
            LinkedIn
          </a>
        </motion.li>
        <motion.li variants={liVariants}>
          <a target="_blank" download="Joud_ElShawa-Resume" href="/resume.pdf">
            Resume
          </a>
        </motion.li>
        <motion.li variants={liVariants}>
          <a target="_blank" href="https://github.com/joudelshawa">
            Github
          </a>
        </motion.li>
        <motion.li className="relative" variants={liVariants}>
          <a target="_blank" href="mailto:jelshawa@gmail.com">
            Email
          </a>
        </motion.li>
      </motion.ul>

      <span
        className="font-mono"
        style={{ fontSize: "clamp(0.65rem, 1.6vh, 0.85rem)" }}
      >
        If you prefer to just copy my email, click here -&gt;{" "}
        <span
          onClick={copyEmail}
          className="relative inline-block cursor-pointer text-ink-faint transition-colors duration-200 hover:text-terracotta-light"
        >
          jelshawa@gmail.com{" "}
          <AnimatePresence>
            {emailCopied && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2"
              >
                <Celebration />
                <div className="relative flex items-center gap-2 rounded-full bg-ink-light px-4 py-2 shadow-2xl ring-1 ring-white/10">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                    className="text-lg font-bold text-terracotta-light"
                  >
                    ✓
                  </motion.span>
                  <span className="text-sm font-medium tracking-wide text-cream-100">
                    Copied!
                  </span>
                </div>
                {/* Arrow */}
                <div
                  className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-ink-light ring-1 ring-white/10"
                  style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      </span>
    </div>
  )
}

const ulVariants: AnimationProps["variants"] = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.5,
      ease,
    },
  },
}

const liVariants: AnimationProps["variants"] = {
  hidden: {
    opacity: 0,
    y: 90,
    transition: {
      ease,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease,
    },
  },
}

const Celebration = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -z-10 h-1 w-1 -translate-x-1/2 -translate-y-1/2">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos(i * 45 * (Math.PI / 180)) * 50,
            y: Math.sin(i * 45 * (Math.PI / 180)) * 50,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: ["#C4654A", "#7A8B6F", "#D4836C", "#98A88E"][
              i % 4
            ],
          }}
        />
      ))}
    </div>
  )
}
