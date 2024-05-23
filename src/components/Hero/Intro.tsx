import { motion } from 'framer-motion'
import { useContext } from 'react'

import { IntroContext, IntroContextType } from '@/contexts/introContext'
import { ease, textBubbleVariants } from '@/utils/framer'

export default function Intro() {
  const { setShouldShowIntro } = useContext(IntroContext) as IntroContextType
  const text = "Hi, I'm Joud!"

  return (
    <motion.div
      initial={{ opacity: 0.999999 }}
      animate={{ opacity: 1 }}
      onAnimationComplete={() => setShouldShowIntro(false)}
      transition={{ duration: 2, ease }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-scroll px-4"
    >
      <motion.div
        key={text}
        className="chat chat-end"
        transition={{
          duration: 2,
          ease,
        }}
        style={{
          scale: 1.5,
        }}
      >
        <motion.div
          layoutId="hello"
          variants={textBubbleVariants}
          initial="hidden"
          animate="visible"
          className="chat-bubble max-w-lg bg-slate-800 text-lg font-light text-white before:h-4 before:w-4 before:-translate-x-px md:text-[clamp(0.875rem,0.3242rem+1.1475vw,1.4rem);]"
        >
          {text}
        </motion.div>

        {/* Mobile avatar */}
        <motion.div
          initial={{ scale: 0 }}
          layoutId="avatar-sm"
          animate={{
            scale: 1,
            transition: { type: "spring", stiffness: 250, damping: 20 },
          }}
          className="avatar chat-image block md:hidden"
          transition={{
            layout: {
              duration: 1,
              ease,
            },
          }}
        >
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src="/me.webp" />
          </div>
        </motion.div>

        {/* Desktop avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: { type: "spring", stiffness: 250, damping: 20 },
          }}
          layoutId="avatar-lg"
          transition={{
            layout: {
              duration: 1,
              ease,
            },
          }}
          style={{
            borderRadius: 50,
          }}
          className="z-0 hidden h-10 w-10 bg-[url('/me.webp')] bg-cover bg-center md:block"
        ></motion.div>
      </motion.div>
    </motion.div>
  )
}
