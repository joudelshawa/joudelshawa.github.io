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
      className="chat-end flex gap-3 self-end py-1"
    >
      <motion.div
        {...(index === 0 && {
          layoutId: "hello",
          onLayoutAnimationComplete: () => {
            console.log("layout animation complete")
            setIntroComplete(true)
            setShouldShowIntro(false)
          },
        })}
        variants={textBubbleVariants}
        initial={index === 0 ? "visible" : "hidden"}
        animate={visible || index === 0 ? "visible" : "hidden"}
        className="sm chat-bubble max-w-lg bg-ink text-lg font-light text-cream-200 before:h-4 before:w-4 before:-translate-x-px md:text-[clamp(0.875rem,0.3242rem+1.1475vw,1.4rem);] short:text-base"
        transition={{
          layout: {
            duration: 1.2,
            ease,
          },
        }}
      >
        {children}
      </motion.div>
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
        className="avatar chat-image block md:hidden"
        transition={{
          layout: {
            duration: 1,
            ease,
          },
        }}
      >
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src="/me.jpg" />
        </div>
      </motion.div>
    </motion.div>
  )
}
