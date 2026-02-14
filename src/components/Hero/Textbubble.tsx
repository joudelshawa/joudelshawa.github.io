import { motion } from "framer-motion"

import { useIntroContext } from "@/contexts/introContext"
import { ease, textBubbleVariants } from "@/utils/framer"

type Props = {
  children: React.ReactNode
  visible: boolean
  index: number
}

export default function TextBubble({ children, visible, index }: Props) {
  const { setIntroComplete, setShouldShowIntro } = useIntroContext()
  return (
    <motion.div
      key={children?.toString()}
      className="flex items-end justify-end gap-3 py-1"
    >
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
        animate={visible || index === 0 ? "visible" : "hidden"}
        className="max-w-lg rounded-[1.25rem] rounded-br-[0.25rem] bg-ink px-5 py-3.5 text-lg font-light text-cream-200 md:text-[clamp(0.875rem,0.3242rem+1.1475vw,1.4rem)] short:text-base"
        transition={{
          layout: {
            duration: 1.2,
            ease,
          },
        }}
      >
        {children}
      </motion.div>

      {/* Mobile avatar */}
      <motion.div
        initial={{ scale: index === 0 ? 1 : 0 }}
        {...(index === 0 && { layoutId: "avatar-sm" })}
        animate={
          visible || index === 0
            ? {
                scale: 1,
                transition: { type: "spring", stiffness: 250, damping: 20 },
              }
            : { scale: 0 }
        }
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
    </motion.div>
  )
}
