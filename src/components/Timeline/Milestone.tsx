import { motion, useAnimate, useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { milestoneVariants } from '@/utils/framer'

type Props = {
  milestone: Milestone
  index: number
  isFirst?: boolean
  isLast?: boolean
}

export default function Milestone({ milestone, isFirst, isLast }: Props) {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      console.log(milestone.text + " is in view")
      handleInView()
    }
  }, [isInView])

  async function handleInView() {
    if (!isFirst)
      await animate(".top-line", { scaleY: [0, 1] }, { duration: 0.5 })
    await animate(".timeline-middle", { scale: [0, 1] }, { duration: 0.5 })
    await animate(".timeline-start", { opacity: [0, 1] }, { duration: 0.5 })
    await animate(".timeline-end", { opacity: [0, 1] }, { duration: 0.5 })
    if (!isLast)
      await animate(".bottom-line", { scaleY: [0, 1] }, { duration: 0.5 })
  }
  return (
    <motion.li
      ref={scope}
      key={milestone.date}
      className="min-h-[6rem] grid-cols-[1fr_min-content_2fr] md:grid-cols-[1fr_min-content_6fr]" // @joud change this value [10rem] to set the gap between milestones
    >
      <div className="timeline-start justify-self-start" style={{ opacity: 0 }}>
        {milestone.date}
      </div>
      {!isFirst && (
        <motion.hr
          className="top-line"
          style={{
            scaleY: 0,
          }}
        />
      )}
      <motion.div
        className="timeline-middle"
        style={{
          scale: 0,
        }}
      >
        <motion.div className="h-3 w-3 rounded-full bg-black" />
      </motion.div>
      <Wrapper milestone={milestone}>{milestone.text}</Wrapper>
      {!isLast && <motion.hr className="bottom-line" />}
    </motion.li>
  )
}

const Wrapper = ({
  children,
  milestone,
}: {
  children: React.ReactNode
  milestone: Milestone
}) =>
  milestone.href ? (
    <Link
      className="timeline-end timeline-box cursor-pointer border border-sky-500 transition-colors hover:bg-sky-500 hover:text-white" // @joud change these classes for clickable milestones
      href={milestone.href}
      target="_blank"
    >
      {children}
    </Link>
  ) : (
    <div className="timeline-end timeline-box">{children}</div>
  )
