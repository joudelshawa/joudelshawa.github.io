import { motion } from "framer-motion"

import { useIntroContext } from "@/contexts/introContext"
import { ease, textBubbleVariants } from "@/utils/framer"

type Props = {
  children: React.ReactNode
  visible: boolean
  index: number
}

const avatarVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20,
    },
  },
} as const

export default function TextBubble({ children, visible, index }: Props) {
  const { setIntroComplete, setShouldShowIntro } = useIntroContext()
  const animationPhase = visible || index === 0 ? "visible" : "hidden"

  return (
    <motion.div
      key={children?.toString()}
      className="flex items-end justify-start gap-3 py-1"
    >
      {/* Mobile avatar */}
      <motion.div
        initial={index === 0 ? "visible" : "hidden"}
        {...(index === 0 && { layoutId: "avatar-sm" })}
        variants={avatarVariants}
        animate={animationPhase}
        className="block flex-shrink-0 md:hidden "
        transition={{
          layout: {
            duration: 1,
            ease,
          },
        }}
      >
        <div className="h-[3.25rem] w-[3.25rem] overflow-hidden rounded-full ring-2 ring-cream-300">
          <img
            alt="Joud El-Shawa"
            src="/me.jpg"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Bubble */}
      <motion.div
        {...(index === 0 && {
          layoutId: "hello",
          onLayoutAnimationComplete: () => {
            setIntroComplete(true)
            setShouldShowIntro(false)
          },
        })}
        variants={textBubbleVariants}
        initial={index === 0 ? "visible" : "hidden"}
        animate={animationPhase}
        className="max-w-lg rounded-[1.25rem] rounded-bl-[0.25rem] bg-ink px-5 py-3.5 text-lg font-light text-cream-200 md:text-[clamp(0.875rem,0.3242rem+1.1475vw,1.4rem)] short:text-base"
        transition={{
          layout: {
            duration: 1.2,
            ease,
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
