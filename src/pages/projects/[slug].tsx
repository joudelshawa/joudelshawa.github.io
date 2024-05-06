import { motion } from "framer-motion"
import { useRouter } from "next/router"

import ProjectDetailImage from "@/components/Projects/ProjectDetailImage"
import projectData from "@/data/projects"

export default function ProjectDetailPage() {
  const router = useRouter()

  const project = projectData.find(
    (p) => p.detailsPage === "/projects/" + router.query.slug
  )

  if (!project)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-5xl">Project not found</h1>
      </div>
    )

  return (
    <div className="relative mx-auto grid w-full max-w-7xl px-4 pt-36 md:grid-cols-12">
      <div className="col-span-4">
        <motion.span
          key={project.name}
          layoutId={project.name}
          layout="position"
          className="text-[clamp(1.875rem,1.0356rem+2.8275vw,3.75rem)] font-semibold transition-colors"
        >
          {project.name}
        </motion.span>
        <ProjectDetailImage project={project} />
      </div>
    </div>
  )
}
