import Image from "next/image"

import { cn } from "@/utils/misc"

type Props = {
  project: Project
}

export default function ProjectDetailImage({ project }: Props) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-2xl "
      )}
    >
      <Image
        src={project.image}
        alt={project.name}
        className="aspect-square w-full rounded-xl object-cover"
        width={400}
        height={400}
      />
    </div>
  )
}
