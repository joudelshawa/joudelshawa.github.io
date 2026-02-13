import fs from "fs"
import path from "path"

import { motion } from "framer-motion"
import matter from "gray-matter"
import Link from "next/link"
import { useRouter } from "next/router"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { useEffect } from "react"

import ProjectDetailImage from "@/components/Projects/ProjectDetailImage"
import projectData from "@/data/projects"
import { cn } from "@/utils/misc"

import type { InferGetStaticPropsType, GetStaticProps } from "next"

export const getStaticProps = (async (context) => {
  const slug = context.params?.slug as string
  const project = projectData.find((project) => project.slug === slug)!

  // Read markdown file
  const contentPath = path.join(
    process.cwd(),
    "content",
    "projects",
    `${slug}.md`
  )
  const fileContents = fs.readFileSync(contentPath, "utf8")
  const { content } = matter(fileContents)

  // Serialize markdown to MDX
  const mdxSource = await serialize(content)

  return { props: { project, mdxSource } }
}) satisfies GetStaticProps<{
  project: Project
  mdxSource: MDXRemoteSerializeResult
}>

export const getStaticPaths = () => {
  const paths = projectData.map((project) => ({
    params: { slug: project.slug },
  }))

  return { paths, fallback: false }
}

export default function ProjectDetailPage({
  project,
  mdxSource,
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
      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-24">
        <button
          className="text-md group flex w-min items-center justify-center rounded-2xl border border-ink/[0.06] bg-cream-200 py-3 pl-4 pr-5 font-mono text-sm font-medium text-ink-muted transition-colors hover:bg-cream-300"
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
          className="font-display text-[clamp(1.875rem,1.0356rem+2.8275vw,2.75rem)] leading-none tracking-tight text-ink"
        >
          {project.name}
        </motion.span>
        <ProjectDetailImage project={project} />
        <div className="w-full space-y-6">
          <p className="italic text-ink-muted">{project.blurb}</p>
          <div className="prose max-w-none text-justify text-ink-muted prose-p:text-ink-muted prose-strong:text-ink-light prose-img:rounded-lg">
            <MDXRemote {...mdxSource} />
          </div>
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
            <p className="font-mono text-terracotta">
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
                  {project.links && i < project.links.length - 1 && ", "}
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
    { bg: "bg-cream-300", text: "text-ink-light" },
    { bg: "bg-terracotta-faint", text: "text-terracotta-dark" },
    { bg: "bg-sage-faint", text: "text-sage-dark" },
    { bg: "bg-cream-200", text: "text-ink-muted" },
    { bg: "bg-terracotta-faint", text: "text-terracotta" },
  ]

  const color =
    colors[index] || colors[Math.floor(Math.random() * colors.length)]

  return (
    <div
      className={cn(
        "rounded-full px-4 py-2 font-mono text-sm",
        color.bg,
        color.text
      )}
    >
      {children}
    </div>
  )
}
