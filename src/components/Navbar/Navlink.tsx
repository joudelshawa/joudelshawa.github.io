import { AnimationProps, motion } from 'framer-motion'
import Link from 'next/link'

import { ease } from '@/utils/framer'
import { useLenis } from '@studio-freight/react-lenis'

import styles from '../PerspectiveLink/PerspectiveText.module.css'

type Props = {
  href: string
  children: string
}
export default function Navlink({ href, children }: Props) {
  const lenis = useLenis()

  return (
    <Link href={href}>
      <motion.span
        variants={linkVariants}
        // onClick={() => lenis?.scrollTo(href)}
        className={styles.button}
      >
        <div className="flex size-full items-center justify-center text-slate-900">
          <PerspectiveText>{children}</PerspectiveText>
        </div>
      </motion.span>
    </Link>
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

const linkVariants: AnimationProps["variants"] = {
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
