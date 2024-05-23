import Image from 'next/image'

type Props = {
  project: Project
}

export default function ProjectDetailImage({ project }: Props) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 shadow-xl shadow-slate-100">
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
