import { motion } from "framer-motion"
import { useRef } from "react"

import milestoneData from "@/data/milestones"

import SectionHeading from "../SectionHeading"
import Milestone from "./Milestone"

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)

  const milestones = milestoneData

  return (
    <section id="milestones" ref={ref} className="relative px-4 pb-24">
      <SectionHeading>Milestones</SectionHeading>
      <motion.ul
        key="milestones-container"
        className="relative mx-auto flex w-full max-w-7xl flex-col"
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
    </section>
  )
}
