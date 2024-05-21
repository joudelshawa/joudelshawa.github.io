import { motion } from 'framer-motion'

import { useContactContext } from '@/contexts/contactContext'
import { ease } from '@/utils/framer'

import styles from './ContactButton.module.css'

export default function ContactButton() {
  const { modalOpen, setModalOpen } = useContactContext()

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease }}
      onClick={() => setModalOpen(!modalOpen)}
      className={styles.button}
    >
      <motion.div
        animate={{
          y: modalOpen ? "-100%" : "0",
        }}
        transition={{ duration: 0.5, ease }}
        className="relative h-full"
      >
        <div className="flex size-full items-center justify-center bg-slate-900 text-white">
          <PerspectiveText>Contact</PerspectiveText>
        </div>
        <div className="absolute flex size-full items-center justify-center bg-white">
          <PerspectiveText>Close</PerspectiveText>
        </div>
      </motion.div>
    </motion.button>
  )
}
function PerspectiveText({ children }: { children: string }) {
  return (
    <div className={styles.perspective}>
      <p>{children}</p>
      <p>{children}</p>
    </div>
  )
}
