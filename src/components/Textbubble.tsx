import { motion } from 'framer-motion'

import { ease, textBubbleVariants } from '@/utils/framer'

type Props = {
  children: React.ReactNode
  visible: boolean
  index: number
}

export default function TextBubble({ children, visible, index }: Props) {
  return (
    <motion.div
      key={children?.toString()}
      className="chat-end flex gap-3 self-end py-1"
    >
      <motion.div
        {...(index === 0 && { layoutId: "hello" })}
        variants={textBubbleVariants}
        initial={index === 0 ? "visible" : "hidden"}
        animate={visible || index === 0 ? "visible" : "hidden"}
        className="sm chat-bubble  max-w-lg bg-slate-800 text-[clamp(0.875rem,0.5rem+0.9275vw,1.4rem)] text-white before:h-4 before:w-4 before:-translate-x-px"
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
        className="chat-image avatar block md:hidden"
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
