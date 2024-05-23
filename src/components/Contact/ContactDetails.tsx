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
      className="flex h-full flex-col justify-between gap-8 p-10 text-white"
    >
      <p className="text-slate-500">Get in touch</p>
      <motion.ul
        variants={ulVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="space-y-12 text-5xl font-medium"
      >
        <motion.li className="relative" variants={liVariants}>
          <a href="mailto:jelshawa@gmail.com">Email</a>
          <span
            onClick={copyEmail}
            className="absolute -bottom-5 left-0 text-base font-light text-slate-500"
          >
            jelshawa@gmail.com{" "}
            {emailCopied && <span className="text-blue-200"> - copied!</span>}
          </span>
        </motion.li>
        <motion.li variants={liVariants}>
          <a href="https://www.linkedin.com/in/joudelshawa">LinkedIn</a>
        </motion.li>
        <motion.li variants={liVariants}>
          <a download="Joud_ElShawa-Resume" href="/resume.pdf">
            Resume
          </a>
        </motion.li>
      </motion.ul>
      <div className="footer grid grid-cols-2  grid-rows-2 border-y border-slate-700 p-4">
        {/* <div>lorem</div>
        <div>lorem</div>
        <div>lorem</div>
        <div>lorem</div> */}
      </div>
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
