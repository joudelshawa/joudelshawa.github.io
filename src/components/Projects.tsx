import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import projectData from '@/data/projects'
import { genGradient } from '@/utils/culler'
import { projectContainerVariants } from '@/utils/framer'

import ProjectModal from './ProjectModal'
import ProjectPreview from './ProjectPreview'

type Props = {}

export default function Projects() {
  return (
    <motion.section
      key="projects-container"
      initial="hidden"
      animate="visible"
      variants={projectContainerVariants}
      exit={{ opacity: 0 }}
      className="mx-auto my-4  w-full max-w-7xl"
    >
      <div id="container" className="flex w-full flex-col-reverse md:flex-row">
        <ul id="left/bot" className="w-full px-4 py-[50vh]">
          {projectData.map((project) => (
            <p className="py-36 text-6xl font-semibold text-slate-300">
              <li key={project.name}>{project.name}</li>
            </p>
          ))}
        </ul>
        <div
          id="right/top"
          className="sticky top-0 flex h-[50vh] w-full items-center px-4 filter backdrop-blur-xl md:h-screen"
        >
          <div
            id="inner"
            className="aspect-square w-full rounded-2xl bg-gray-100"
          ></div>
        </div>
      </div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </motion.section>
  )
}
