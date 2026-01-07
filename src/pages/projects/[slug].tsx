import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Navbar from '@/components/Navbar/Navbar'
import ProjectDetailImage from '@/components/Projects/ProjectDetailImage'
import projectData from '@/data/projects'
import { cn } from '@/utils/misc'

import type { InferGetStaticPropsType, GetStaticProps } from "next"

export const getStaticProps = (async (context) => {
  const slug = context.params?.slug as string
  const repo = projectData.find((project) => project.slug === slug)!

  return { props: { project: repo } }
}) satisfies GetStaticProps<{
  project: Project
}>

export const getStaticPaths = () => {
  const paths = projectData.map((project) => ({
    params: { slug: project.slug },
  }))

  return { paths, fallback: false }
}

export default function ProjectDetailPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1>Project not found</h1>
      </div>
    )

  return (
    <>
      <Navbar navLinks={[]} />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-24">
        <button
          className="text-md group flex w-min items-center justify-center rounded-2xl  bg-gradient-to-tr from-slate-100 to-slate-50 py-3 pl-4 pr-5 font-medium text-slate-700"
          type="button"
          onClick={() => router.back()}
        >
          <svg
            className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          <span className="leading-[0rem]">Back</span>
        </button>
        <motion.span
          key={project.name}
          className="text-[clamp(1.875rem,1.0356rem+2.8275vw,2.75rem)] font-semibold leading-none tracking-tighter"
        >
          {project.name}
        </motion.span>
        <ProjectDetailImage project={project} />
        <div className="w-full space-y-6">
          <p className="italic text-slate-900">{project.blurb}</p>
          <p className="whitespace-pre-line text-justify text-slate-600">
            {project.description}
          </p>
          {/* {project.links &&
            project.links.map((link) => (
              <Link
                className="font-mono text-blue-700 underline"
                href={link.href}
                key={link.text}
              >
                {link.text}
              </Link>
            ))} */}
          {project.links && (
              <p className="font-mono text-blue-700">
                {project.links.map((link, i) => (
                  <>
                    <Link
                      className="underline"
                      href={link.href}
                      key={link.text}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </Link>
                    {project.links && i < project.links.length - 1 && ', '}
                  </>
                ))}
              </p>
            )}

          <div className="flex flex-wrap gap-4">
            {project.technologies.map((tech, index) => (
              <TechPill key={tech} index={index}>
                {tech}
              </TechPill>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

type TechPillProps = {
  children: React.ReactNode
  index: number
}

function TechPill({ children, index }: TechPillProps) {
  const colors = [
    { bg: "bg-slate-100", text: "text-slate-900" },
    { bg: "bg-rose-100", text: "text-rose-900" },
    { bg: "bg-amber-100", text: "text-amber-900" },
    { bg: "bg-cyan-100", text: "text-cyan-900" },
    { bg: "bg-green-100", text: "text-green-900" },
  ]

  const color =
    colors[index] || colors[Math.floor(Math.random() * colors.length)]

  return (
    <div className={cn("rounded-full px-4 py-2", color.bg, color.text)}>
      {children}
    </div>
  )
}
