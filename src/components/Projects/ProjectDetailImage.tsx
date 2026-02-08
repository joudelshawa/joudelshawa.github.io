import Image from "next/image"

type Props = {
  project: Project
}

export default function ProjectDetailImage({ project }: Props) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-cream-200 shadow-xl shadow-ink/[0.06]">
      <Image
        src={project.image}
        alt={project.name}
        className="aspect-video w-full rounded-xl object-contain"
        width={400}
        height={200}
      />
    </div>
  )
}
