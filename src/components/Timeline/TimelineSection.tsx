import { motion, useScroll } from "framer-motion"
import { useRef } from "react"

import milestoneData from "@/data/milestones"
import { milestoneVariants } from "@/utils/framer"

import SectionHeading from "../SectionHeading"
import Milestone from "./Milestone"
import Today from "./Today"

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section ref={ref} className="relative px-4 pt-36">
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
        className="timeline timeline-vertical mx-auto w-full max-w-7xl py-[50vh]"
      >
        {milestoneData.map((milestone, index) => (
          <Milestone
            key={milestone.date}
            milestone={milestone}
            index={index}
            isFirst={index === 0}
            isLast={index === milestoneData.length - 1}
          />
        ))}
        <Today />
      </motion.ul>
      <div className="h-screen"> </div>
    </section>
  )
}
