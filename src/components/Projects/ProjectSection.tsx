import { motion } from "framer-motion"

import { useProjectContext } from "@/contexts/projectContext"
import projectData from "@/data/projects"
import { projectContainerVariants } from "@/utils/framer"
import { cn } from "@/utils/misc"

import SectionHeading from "../SectionHeading"
import ProjectPreviewImage from "./ProjectPreviewImage"
import ProjectTitle from "./ProjectTitle"

export default function ProjectSection() {
  const { inViewProject } = useProjectContext()

  return (
    <motion.section
      key="projects-container"
      id="projects"
      initial="hidden"
      animate="visible"
      variants={projectContainerVariants}
      exit={{ opacity: 0 }}
      className={cn("relative w-full px-4 transition-colors duration-500")}
    >
      <SectionHeading>Projects</SectionHeading>
      <div
        id="container"
        className="relative mx-auto flex w-full max-w-7xl flex-col-reverse md:flex-row"
      >
        <ul
          id="left/bot"
          className="w-full overflow-x-hidden px-4 py-10 md:py-[50vh]"
        >
          {projectData.map((project) => (
            <li key={project.name}>
              <ProjectTitle project={project} />
            </li>
          ))}
        </ul>
        <div
          id="right/top"
          className="sticky top-0 flex aspect-video w-full items-center p-4 pt-24 md:aspect-auto md:h-screen md:pt-4"
        >
          <motion.div
            id="inner"
            className="relative aspect-video max-h-full w-full rounded-2xl bg-cream-200 shadow-lg shadow-ink/[0.04]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all", margin: "50%" }}
          >
            {projectData.map((project, index) => (
              <ProjectPreviewImage key={index} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
