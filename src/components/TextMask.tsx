import { motion } from 'framer-motion'
import { useState } from 'react'

import { textMaskChildVariants, textMaskVariants } from '@/utils/framer'

type TextMaskProps = {
  children: string
  className?: string
  delay?: number
  type?: "word" | "letter"
  layoutId?: string
}

export default function TextMask({
  children,
  className,
  delay = 0,
  type = "word",
  layoutId,
}: TextMaskProps) {
  const [key, setKey] = useState(crypto.randomUUID())
  const splitOn = type === "word" ? " " : ""

  return (
    <motion.div
      className={`relative cursor-pointer overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={key}
      onClick={() => setKey(crypto.randomUUID())}
      variants={textMaskVariants}
      custom={delay}
      layoutId={layoutId}
    >
      {children.split(splitOn).map((child, i) => (
        <motion.span
          key={i}
          variants={textMaskChildVariants}
          className="inline-block py-0"
        >
          {child}
          {type === "word" && <>&nbsp;</>}
        </motion.span>
      ))}
    </motion.div>
  )
}
