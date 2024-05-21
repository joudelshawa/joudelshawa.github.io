import GithubSVG from '/public/github.svg'
import LinkedInSVG from '/public/linkedin.svg'
import TwitterSVG from '/public/twitter.svg'
import { AnimatePresence, AnimationProps, motion } from 'framer-motion'
import { useState } from 'react'

import { useContactContext } from '@/contexts/contactContext'
import { ease, socialsContainerVariants } from '@/utils/framer'

import SocialButton from './SocialButton'

export default function ContactDetails() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("joud@shawa.dev")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div
      style={{
        textTransform: "none",
      }}
      className="flex h-full flex-col justify-between p-4 text-white"
    >
      <p className="text-slate-500">Get in touch</p>
      <motion.ul
        variants={ulVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="space-y-12 text-5xl font-medium"
      >
        <motion.li variants={liVariants}>Email</motion.li>
        <motion.li variants={liVariants}>LinkedIn</motion.li>
        <motion.li variants={liVariants}>Resume</motion.li>
      </motion.ul>
      <div className="footer grid grid-cols-2 grid-rows-2 p-4">
        <div>Lorem </div>
        <div>Lorem </div>
        <div>Lorem </div>
        <div>Lorem </div>
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
