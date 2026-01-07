import { AnimationProps, motion } from 'framer-motion'
import { useState } from 'react'

import { ease } from '@/utils/framer'

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
        padding: "clamp(1.5rem, 6vh, 6rem) clamp(1.5rem, 5vw, 2.5rem) clamp(2rem, 8vh, 4rem)",
        gap: "clamp(1rem, 4vh, 2rem)",
      }}
      className="flex h-full flex-col justify-between text-white"
    >
      <motion.div exit="hidden" variants={liVariants}>
        <p className="text-slate-500" style={{ fontSize: "clamp(0.75rem, 1.8vh, 1rem)" }}>Get in touch!</p>
        <p className="text-slate-300" style={{ fontSize: "clamp(0.9rem, 2.2vh, 1.25rem)", lineHeight: 1.4 }}>
          Feel free to reach out, I&apos;m always excited to learn, collaborate, and contribute to impactful projects! 💬
        </p>
      </motion.div>
      <motion.ul
        variants={ulVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="font-medium"
        style={{ 
          fontSize: "clamp(2rem, 6vh, 3rem)",
          gap: "clamp(1.5rem, 4vh, 2.5rem)",
          display: "flex",
          flexDirection: "column"
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

      <span style={{ fontSize: "clamp(0.75rem, 1.8vh, 1rem)" }}>
        If you prefer to just copy my email, click here -&gt;{" "}
        <span
          onClick={copyEmail}
          className="cursor-pointer font-light text-slate-500 transition-colors duration-200 hover:text-blue-200"
        >
          jelshawa@gmail.com{" "}
          {emailCopied && <span className="text-blue-200"> - copied!</span>}
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
