import { motion } from 'framer-motion'
import { useRef } from 'react'

import milestoneData from '@/data/milestones'

import SectionHeading from '../SectionHeading'
import Milestone from './Milestone'

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)

  // const milestones = [...milestoneData].reverse()
  const milestones = milestoneData

  return (
    <section id="milestones" ref={ref} className="relative px-4 pb-24">
      <SectionHeading>Milestones</SectionHeading>
      {/* <ul className="timeline timeline-vertical absolute left-1/2 top-0 h-full  w-full max-w-7xl -translate-x-1/2 px-4">
        <motion.li className=" timeline-middle -z-10 h-full w-full origin-top grid-cols-[1fr_min-content_2fr] bg-red-200 md:grid-cols-[1fr_min-content_6fr]">
          <motion.div
            // style={{
            //   scaleY: scrollYProgress,
            // }}
            className="timeline-start -z-10 h-full w-full origin-top bg-yellow-500"
          ></motion.div>
          <motion.div
            style={{
              scaleY: scrollYProgress,
            }}
            className="timeline-middle -z-10 h-full w-2  origin-top bg-green-500"
          ></motion.div>
          <motion.div
            // style={{
            //   scaleY: scrollYProgress,
            // }}
            className="timeline-end -z-10 h-full w-full origin-top bg-yellow-500"
          ></motion.div>
        </motion.li>
      </ul> */}
      <motion.ul
        key="milestones-container"
        className="pt-243 timeline timeline-vertical mx-auto w-full max-w-7xl"
      >
        {milestones.map((milestone, index) => (
          <Milestone
            key={milestone.text}
            milestone={milestone}
            index={index}
            isFirst={index === 0}
            isLast={index === milestones.length - 1}
          />
        ))}
      </motion.ul>
      {/* <Today sectionInView={isInView} sectionScrollProgress={scrollYProgress} /> */}
    </section>
  )
}
