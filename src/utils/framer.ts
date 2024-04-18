import { AnimationProps } from "framer-motion"

export const ease = [0.6, 0.01, 0.05, 0.95] as const

export const textBubbleVariants: AnimationProps["variants"] = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
}

export const socialsContainerVariants: AnimationProps["variants"] = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.5,
    },
  },
}

export const socialsVariants: AnimationProps["variants"] = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease,
    },
  },
}

export const projectContainerVariants: AnimationProps["variants"] = {
  hidden: {},
  visible: {
    transition: {
      delay: 4,
      delayChildren: 4.5,
      staggerChildren: 0.2,
    },
  },
}

export const milestoneVariants: AnimationProps["variants"] = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      // duration: 0.8,
      ease,
    },
  },
}

export const textMaskVariants: AnimationProps["variants"] = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.5,
      ease,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      staggerChildren: 0.05,
      duration: 0.5,
      ease,
    },
  },
}

export const textMaskChildVariants: AnimationProps["variants"] = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease,
    },
  },
}
