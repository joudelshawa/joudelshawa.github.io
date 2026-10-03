import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { glob } from "astro/loaders"

/*
 * Every piece of content on the site, with the rules it has to follow. If an
 * edit breaks a rule (a missing date, a typo in a field name), the build stops
 * with a message saying which file and which field, and the live site stays as
 * it was.
 */

const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use year-month, like 2025-11")

/** Empty optional fields, as a form may write them ("" or null), count as absent. */
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === "" || value === null ? undefined : value), schema.optional())

const link = z.object({
  text: z.string().min(1),
  href: z.string().min(1),
})

/** Her greeting: the messages a visitor sees first. */
const intro = defineCollection({
  loader: glob({ pattern: "intro.yaml", base: "./src/content/site" }),
  schema: z.object({
    messages: z.array(z.string().min(1)).min(1, "Add at least one message"),
    latest: optional(z.string().min(1)),
  }),
})

/** Who she is and how to reach her. */
const profile = defineCollection({
  loader: glob({ pattern: "profile.yaml", base: "./src/content/site" }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      shortName: z.string().min(1),
      role: z.string().min(1),
      citationName: z.string().min(1),
      photo: image(),
      email: z.email(),
      linkedin: z.url(),
      github: z.url(),
      resume: z.string().min(1),
      contactLine: z.string().min(1),
    }),
})

/** Projects, shared as link previews. The file name is the page's URL. */
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int(),
      featured: z.boolean().default(false),
      name: z.string().min(1),
      venue: z.string().min(1),
      year: z.number().int().min(2000).max(2100),
      category: optional(z.string().min(1)),
      blurb: z.string().min(1),
      image: image(),
      technologies: z.array(z.string()).default([]),
      links: z.array(link).default([]),
    }),
})

/** Papers, shared as documents. */
const papers = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/papers" }),
  schema: z.object({
    order: z.number().int(),
    title: z.string().min(1),
    authors: z.string().min(1),
    venue: z.string().min(1),
    year: z.number().int(),
    link: z.url(),
    kind: z.enum(["PDF", "DOI"]),
  }),
})

/** Milestones, one file each, shown oldest first under date separators. */
const milestones = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/milestones" }),
  schema: ({ image }) =>
    z
      .object({
        text: z.string().min(1),
        start: yearMonth,
        end: optional(yearMonth),
        /** Her highlights; not shown differently yet. */
        focused: optional(z.boolean()).transform((v) => v ?? false),
        /** Breaks ties between milestones in the same month (lower first). */
        order: optional(z.number().int()).transform((v) => v ?? 0),
        /** Pictures sent with the milestone, shown as photo messages. */
        photos: z
          .array(
            z.object({
              image: image(),
              alt: z.string().min(1, "Describe the photo for screen readers"),
            })
          )
          .default([]),
      })
      .refine((m) => !m.end || m.end >= m.start, {
        message: "`end` can't be before `start`",
        path: ["end"],
      }),
})

export const collections = { intro, profile, projects, papers, milestones }
