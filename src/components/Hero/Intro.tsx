import { motion } from "framer-motion"
import { useContext } from "react"

import { IntroContext, IntroContextType } from "@/contexts/introContext"
import { ease, textBubbleVariants } from "@/utils/framer"

export default function Intro() {
  const { setShouldShowIntro } = useContext(
    IntroContext
  ) as IntroContextType
  const text = "Hi, I'm Joud!"

  return (
    <motion.div
      initial={{ opacity: 0.999999 }}
      animate={{ opacity: 1 }}
      onAnimationComplete={() => setShouldShowIntro(false)}
      transition={{ duration: 2, ease }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <motion.div
        key={text}
        className="flex items-end gap-3"
        transition={{ duration: 2, ease }}
      >
        {/* Chat bubble */}
        <motion.div
          layoutId="hello"
          variants={textBubbleVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.12 }}
          className="bubble-message max-w-lg rounded-[1.25rem] rounded-br-[0.25rem] bg-ink px-5 py-3.5 text-lg font-light text-cream-200 md:text-[clamp(0.875rem,0.3242rem+1.1475vw,1.4rem)]"
        >
          {text}
        </motion.div>

        {/* Mobile avatar */}
        <motion.div
          initial={{ scale: 0 }}
          layoutId="avatar-sm"
          animate={{
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 250,
              damping: 20,
              delay: 0.22,
            },
          }}
          className="block flex-shrink-0 md:hidden"
          transition={{
            layout: {
              duration: 1,
              ease,
            },
          }}
        >
          <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-cream-300">
            <img
              alt="Joud El-Shawa"
              src="/me.jpg"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Desktop avatar */}
        <motion.div
          initial={{ scale: 0 }}
          layoutId="avatar-lg"
          animate={{
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 250,
              damping: 20,
              delay: 0.22,
            },
          }}
          transition={{
            layout: {
              duration: 1,
              ease,
            },
          }}
          style={{
            borderRadius: 50,
          }}
          className="z-0 hidden h-14 w-14 flex-shrink-0 bg-[url('/me.jpg')] bg-cover bg-center md:block"
        ></motion.div>
      </motion.div>
    </motion.div>
  )
}
