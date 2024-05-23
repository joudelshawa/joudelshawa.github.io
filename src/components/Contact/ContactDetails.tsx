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
      }}
      className="flex h-full flex-col justify-between gap-8 px-10 pb-16 pt-24 text-white"
    >
      <motion.div exit="hidden" variants={liVariants}>
        <p className="text-slate-500">Get in touch</p>
        <p className="text-xl text-slate-300">
          I'm open to new opportunities and connections, please don't hesitate
          to contact me!
        </p>
      </motion.div>
      <motion.ul
        variants={ulVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="space-y-10 text-5xl font-medium"
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

      <span>
        If you prefer to just copy my email, click here -&gt;{" "}
        <span
          onClick={copyEmail}
          className="cursor-pointer text-base font-light text-slate-500 transition-colors duration-200 hover:text-blue-200"
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
