import { motion, useScroll } from "framer-motion"
import { useRef } from "react"

import projectData from "@/data/projects"
import { projectContainerVariants } from "@/utils/framer"

import SectionHeading from "../SectionHeading"
import ProjectCard from "./ProjectCard"
import ProjectTitle from "./ProjectTitle"

export default function ProjectSection() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref })

  return (
    <motion.section
      ref={ref}
      key="projects-container"
      initial="hidden"
      animate="visible"
      variants={projectContainerVariants}
      exit={{ opacity: 0 }}
      className="w-full  px-4"
    >
      <SectionHeading>Projects</SectionHeading>
      <div
        id="container"
        className="mx-auto flex w-full max-w-7xl flex-col-reverse md:flex-row"
      >
        <ul id="left/bot" className="w-full overflow-x-hidden px-4 py-[50vh]">
          {projectData.map((project) => (
            <li key={project.name}>
              <ProjectTitle project={project} />
            </li>
          ))}
        </ul>
        <div
          id="right/top"
          className="sticky top-0 flex h-[50vh] w-full items-center p-4 pt-24 md:h-screen md:pt-4"
        >
          <motion.div
            id="inner"
            className="relative aspect-square max-h-full w-full rounded-2xl bg-gray-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all" }}
          >
            {projectData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
