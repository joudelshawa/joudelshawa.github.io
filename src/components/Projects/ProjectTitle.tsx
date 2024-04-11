import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import Link from "next/link"
import { useEffect, useRef } from "react"

import { useProjectContext } from "@/contexts/projectContext"
import useScreenSize from "@/hooks/use-screen-size"
import { cn } from "@/utils/misc"

type Props = {
  project: Project
}

type TransformArrays = {
  opacity: {
    sm: [number[], number[]]
    lg: [number[], number[]]
  }
  scale: {
    sm: [number[], number[]]
    lg: [number[], number[]]
  }
}

const transformArrays: TransformArrays = {
  opacity: {
    sm: [
      [1, 0], // input
      [1, 1], // output
    ],
    lg: [
      [0, 0.3, 0.7, 0.9, 1],
      [0, 1, 1, 0.3, 0],
    ],
  },
  scale: {
    sm: [
      [1, 0],
      [1, 1],
    ],
    lg: [
      [0, 0.3, 0.7, 1],
      [1.2, 1, 1, 1.2],
    ],
  },
}

export default function ProjectTitle({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { isMobile } = useScreenSize()
  const { inViewProject, setInViewProject } = useProjectContext()

  const { scrollYProgress } = useScroll({ target: ref })

  const opacityTransformValues = isMobile
    ? transformArrays.opacity.sm
    : transformArrays.opacity.lg

  const scaleTransformValues = isMobile
    ? transformArrays.scale.sm
    : transformArrays.scale.lg

  const opacity = useTransform(scrollYProgress, ...opacityTransformValues)
  const scale = useTransform(scrollYProgress, ...scaleTransformValues)

  const isInView = useInView(ref, {
    margin: isMobile ? "-75% 0px -25% 0px" : "-50% 0px -50% 0px",
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (project.name === "Culler") {
      console.log(latest)
    }
  })

  useEffect(() => {
    if (isInView) {
      setInViewProject(project)
    }
    // if (!isInView && inViewProject?.name === project.name) {
    //   setInViewProject(null)
    // }
  }, [isInView])

  return (
    <motion.div
      // style={{ scale, opacity }}
      ref={ref}
      className="origin-left py-36"
    >
      <Link href={project.detailsPage}>
        <p
          className={cn(
            "font-mono text-sm transition-all duration-500 ease-in-out",
            isInView
              ? "translate-x-0 opacity-100 delay-500"
              : "translate-x-1 opacity-0"
          )}
        >
          {project.year}
        </p>
        <p
          className={cn(
            "text-6xl font-semibold transition-colors",
            isInView ? "text-slate-700" : "text-slate-300"
          )}
        >
          {project.name}
        </p>
        <p
          className={cn(
            "transition-all duration-500",
            isInView
              ? "translate-x-0 opacity-100 delay-300"
              : "-translate-x-2 opacity-0"
          )}
          style={
            {
              // animationPlayState: isInView ? "running" : "paused",
            }
          }
        >
          {project.blurb}
        </p>
      </Link>
    </motion.div>
  )
}
