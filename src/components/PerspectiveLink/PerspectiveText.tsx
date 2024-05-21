import { motion } from 'framer-motion'

import { ease } from '@/utils/framer'

import styles from './Contact.module.css'

export default function ContactButton() {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease }}
      className={styles.button}
    >
      <div className="flex size-full items-center justify-center bg-slate-900 text-white">
        <PerspectiveText>Contact</PerspectiveText>
      </div>
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
