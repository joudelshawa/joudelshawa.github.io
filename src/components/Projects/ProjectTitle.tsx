import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import Link from "next/link"
import { useEffect, useMemo, useRef } from "react"

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
      [0, 0.2, 1], // input
      [0, 0, 1], // output
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

  const isInViewProject = useMemo(
    () => inViewProject?.name === project.name,
    [isInView, inViewProject]
  )

  useEffect(() => {
    if (isInView) {
      setInViewProject(project)
    }
    // if (!isInView && inViewProject?.name === project.name) {
    //   setInViewProject(null)
    // } // still buggy
  }, [isInView])

  return (
    <motion.div
      style={{ scale, opacity }}
      ref={ref}
      className="origin-left py-12 md:py-36"
    >
      <Link href={project.detailsPage}>
        <p
          className={cn(
            "font-mono text-sm transition-all duration-500 ease-in-out",
            isInViewProject ? project.textColors.tertiary : "text-neutral-200",

            isInViewProject
              ? "translate-x-0 opacity-100 delay-500"
              : "translate-x-1 opacity-0"
          )}
        >
          {project.year}
        </p>
        <motion.span
          key={project.name}
          layoutId={project.name}
          layout="position"
          className={cn(
            "text-[clamp(1.875rem,1.0356rem+2.8275vw,3.75rem)] font-semibold transition-colors",
            isInViewProject
              ? inViewProject?.textColors.primary
              : "text-neutral-200"
          )}
        >
          {project.name}
        </motion.span>
        <p
          className={cn(
            "transition-all duration-500",
            project.textColors.secondary,
            isInViewProject
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
