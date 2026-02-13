import Image from "next/image"
import Link from "next/link"

import { useProjectContext } from "@/contexts/projectContext"
import { cn } from "@/utils/misc"

type Props = {
  project: Project
}

export default function ProjectPreviewImage({ project }: Props) {
  const { inViewProject } = useProjectContext()

  return (
    <Link
      href={`/projects/${project.slug}`}
      scroll={false}
      className={cn(
        "absolute inset-0 flex h-min w-full items-center justify-center rounded-2xl shadow-lg shadow-ink/[0.06] transition-opacity duration-500",
        inViewProject?.name === project.name
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <Image
        src={project.image}
        alt={project.name}
        className="aspect-video w-full rounded-xl object-contain"
        width={400}
        height={200}
      />
    </Link>
  )
}
