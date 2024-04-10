import { useInView } from 'framer-motion'
import { useRef } from 'react'

import useScreenSize from '@/hooks/use-screen-size'
import { cn } from '@/utils/misc'

type Props = {
  project: Project
}

export default function ProjectTitle({ project }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { screenSize, pixelWidth } = useScreenSize()

  console.log({ screenSize })
  const isInView = useInView(ref, {
    margin: pixelWidth > 768 ? "-50% 0px -50% 0px" : "-75% 0px -25% 0px",
  })

  return (
    <p
      ref={ref}
      className={cn(
        "py-36 text-6xl font-semibold transition-colors",
        isInView ? "text-slate-700" : "text-slate-300"
      )}
    >
      {project.name}
    </p>
  )
}
