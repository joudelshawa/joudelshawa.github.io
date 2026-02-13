import { motion, useInView, useScroll, useTransform } from "framer-motion"
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
  }, [isInView])

  return (
    <motion.div ref={ref} className="group/project origin-left py-12 md:py-36">
      <Link href={`/projects/${project.slug}`} scroll={false} className="block space-y-5">
        <div className="space-y-1">
          <p
            className={cn(
              "font-mono text-sm transition-all duration-500 ease-in-out",
              isInViewProject ? "text-ink-subtle" : "text-ink-ghost",
              isInViewProject
                ? "translate-x-0 opacity-100 delay-500"
                : "translate-x-1 opacity-0"
            )}
          >
            {project.year}
          </p>
          {project.category && (
            <p
              className={cn(
                "font-mono text-xs uppercase tracking-widest transition-all duration-500 ease-in-out",
                isInViewProject ? "text-ink-faint" : "text-ink-ghost",
                isInViewProject
                  ? "translate-x-0 opacity-100 delay-500"
                  : "translate-x-1 opacity-0"
              )}
            >
              {project.category}
            </p>
          )}
        </div>

        {/* Project name with hover accent line */}
        <div className="relative inline-block">
          <motion.span
            key={project.name}
            layoutId={project.name}
            layout="position"
            className={cn(
              "block font-display text-[clamp(1.875rem,1.0356rem+2.8275vw,2.75rem)] leading-none tracking-tight transition-colors duration-300",
              isInViewProject ? "text-ink" : "text-ink-ghost"
            )}
          >
            {project.name}
          </motion.span>
          {/* Terracotta accent line — slides in on hover */}
          <span
            className={cn(
              "mt-2 block h-[2px] origin-left bg-terracotta/40 transition-all duration-500 ease-out",
              isInViewProject
                ? "w-12 opacity-100 group-hover/project:w-full group-hover/project:bg-terracotta/60"
                : "w-0 opacity-0"
            )}
          />
        </div>

        <p
          className={cn(
            "transition-all duration-500",
            "text-justify text-ink-muted",
            isInViewProject
              ? "translate-x-0 opacity-100 delay-300"
              : "-translate-x-2 opacity-0"
          )}
        >
          {project.blurb}
        </p>
      </Link>
    </motion.div>
  )
}
