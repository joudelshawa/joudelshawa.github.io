import fs from "fs"
import path from "path"

import matter from "gray-matter"
import Head from "next/head"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"

import { BackButton } from "@/components/thread/Header"
import projectData from "@/data/projects"

import type { InferGetStaticPropsType, GetStaticProps } from "next"

export const getStaticProps = (async (context) => {
  const slug = context.params?.slug as string
  const project = projectData.find((project) => project.slug === slug)!

  const contentPath = path.join(
    process.cwd(),
    "content",
    "projects",
    `${slug}.md`
  )
  const { content } = matter(fs.readFileSync(contentPath, "utf8"))
  const mdxSource = await serialize(content)

  return { props: { project, mdxSource } }
}) satisfies GetStaticProps<{
  project: Project
  mdxSource: MDXRemoteSerializeResult
}>

export const getStaticPaths = () => ({
  paths: projectData.map((project) => ({ params: { slug: project.slug } })),
  fallback: false,
})

const external = (href: string) => /^https?:/.test(href)

/** A project, opened from the link Joud shared in the thread. */
export default function ProjectPage({
  project,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const subtitle = [
    project.category,
    project.venue,
    project.venue.includes(String(project.year)) ? null : project.year,
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <>
      <Head>
        <title>{`${project.name} · Joud El-Shawa`}</title>
        <meta name="description" content={project.blurb} />
      </Head>

      <BackButton href="/#projects" />

      <main className="article">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="article-image"
          src={project.image}
          alt=""
          width={1280}
          height={720}
        />

        <h1 className="article-title">{project.name}</h1>
        <p className="article-sub">{subtitle}</p>

        <p className="article-lead">{project.blurb}</p>

        <div className="article-body">
          <MDXRemote {...mdxSource} />
        </div>

        {project.links && project.links.length > 0 && (
          <ul className="inset article-links" aria-label="Links">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  className="inset-row-link"
                  href={link.href}
                  {...(external(link.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span>{link.text}</span>
                  <svg
                    className="chevron"
                    viewBox="0 0 8 14"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M1.5 1.5 6.5 7l-5 5.5" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="article-built">
          <span className="article-built-label">Built with </span>
          {project.technologies.join(", ")}
        </p>
      </main>
    </>
  )
}
