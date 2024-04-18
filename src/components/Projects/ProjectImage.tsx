import Image from "next/image"
import Link from "next/link"

import { useProjectContext } from "@/contexts/projectContext"
import { cn } from "@/utils/misc"

type Props = {
  project: Project
}

export default function ProjectImage({ project }: Props) {
  const { inViewProject } = useProjectContext()

  return (
    <Link
      href={project.detailsPage}
      className={cn(
        "absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br  shadow-2xl transition-opacity duration-500",
        inViewProject?.name === project.name
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <Image
        src={project.image}
        alt={project.name}
        className="aspect-square w-full rounded-xl object-cover"
        width={400}
        height={400}
      />
    </Link>
  )
}
