import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"

import { useProjectContext } from "@/contexts/projectContext"
import projectData from "@/data/projects"
import { projectContainerVariants } from "@/utils/framer"

import SectionHeading from "../SectionHeading"
import ProjectCard from "./ProjectCard"
import ProjectTitle from "./ProjectTitle"

export default function ProjectContainer() {
  return (
    <motion.section
      key="projects-container"
      initial="hidden"
      animate="visible"
      variants={projectContainerVariants}
      exit={{ opacity: 0 }}
      className="mx-auto my-4  w-full max-w-7xl"
    >
      <SectionHeading>Projects</SectionHeading>
      <div id="container" className="flex w-full flex-col-reverse md:flex-row">
        <ul id="left/bot" className="w-full overflow-x-hidden px-4 py-[50vh]">
          {projectData.map((project) => (
            <li key={project.name}>
              <ProjectTitle project={project} />
            </li>
          ))}
        </ul>
        <div
          id="right/top"
          className="sticky top-0 flex h-[50vh] w-full items-center p-4 pt-24 filter backdrop-blur-xl md:h-screen md:pt-4"
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
            {/* {inViewProject && <ProjectCard project={inViewProject} />} */}
          </motion.div>
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </motion.section>
  )
}
