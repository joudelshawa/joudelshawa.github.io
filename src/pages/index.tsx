import Head from "next/head"
import { useRef, useState } from "react"

import Arrival from "@/components/thread/Arrival"
import { DocumentBubble, LinkPreview } from "@/components/thread/Attachments"
import Bubble from "@/components/thread/Bubble"
import { Composer, ContactCard } from "@/components/thread/Contact"
import Details from "@/components/thread/Details"
import Header from "@/components/thread/Header"
import { DateSeparator, SectionLabel } from "@/components/thread/Separators"
import SuggestedReplies from "@/components/thread/SuggestedReplies"
import YearIndex from "@/components/thread/YearIndex"
import milestones from "@/data/milestones"
import papers from "@/data/papers"
import projectData from "@/data/projects"
import textBubbleData, { latestMessage } from "@/data/text-bubbles"
import { groupMilestones } from "@/lib/milestones"
import { useActiveYear } from "@/lib/useActive"
import { clean, splitReaction } from "@/lib/text"
import { cn } from "@/utils/misc"

const contactLine =
  "Feel free to reach out, I'm always excited to learn, collaborate, and contribute to impactful projects! 💬"

// Her newest line goes just before "check them out below!", which leads into the projects.
const greeting = latestMessage
  ? [...textBubbleData.slice(0, -1), latestMessage, ...textBubbleData.slice(-1)]
  : textBubbleData

const featuredCount = 3
const groups = groupMilestones(milestones)
const years = groups.flatMap((group) =>
  group.yearAnchor ? [group.yearAnchor] : []
)

export default function Home() {
  const intro = useRef<HTMLElement>(null)
  const year = useActiveYear()
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Joud El-Shawa</title>
        <meta name="description" content={clean(textBubbleData[1])} />
      </Head>

      <Header
        detailsOpen={detailsOpen}
        onToggleDetails={() => setDetailsOpen((open) => !open)}
      />

      <div className={cn("layout", detailsOpen && "is-open")}>
        <main className="thread">
          <h1 className="sr-only">
            Joud El-Shawa, Machine Learning Researcher
          </h1>

          <section
            className="intro"
            ref={intro}
            aria-label="Messages from Joud"
          >
            <ol className="run">
              {greeting.map((message, i) => (
                <Bubble key={i} tail={i === greeting.length - 1} arrive>
                  {clean(message)}
                </Bubble>
              ))}
            </ol>
            <Arrival container={intro} />
            <SuggestedReplies />
          </section>

          <section aria-labelledby="projects">
            <SectionLabel id="projects">Projects</SectionLabel>
            <ol className="run">
              {projectData.map((project, i) => (
                <LinkPreview
                  key={project.slug}
                  project={project}
                  size={i < featuredCount ? "large" : "compact"}
                  tail={i === projectData.length - 1}
                />
              ))}
            </ol>
          </section>

          <section aria-labelledby="papers">
            <SectionLabel id="papers">Papers</SectionLabel>
            <ol className="run">
              {papers.map((paper, i) => (
                <DocumentBubble
                  key={paper.href}
                  paper={paper}
                  tail={i === papers.length - 1}
                />
              ))}
            </ol>
          </section>

          <section aria-labelledby="milestones">
            <SectionLabel id="milestones">Milestones</SectionLabel>
            <ol className="history">
              {groups.map((group) => (
                <li
                  key={group.key}
                  id={group.yearAnchor ? `y${group.yearAnchor}` : undefined}
                  data-year={group.start.year}
                >
                  <DateSeparator start={group.start} end={group.end} />
                  <ol className="run">
                    {group.items.map((milestone, i) => {
                      const { text, reaction } = splitReaction(milestone.text)
                      return (
                        <Bubble
                          key={milestone.text}
                          reaction={reaction}
                          tail={i === group.items.length - 1}
                        >
                          {text}
                        </Bubble>
                      )
                    })}
                  </ol>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="contact">
            <SectionLabel id="contact">Contact</SectionLabel>
            <ol className="run">
              <Bubble>{contactLine}</Bubble>
              <ContactCard />
            </ol>
            <Composer />
          </section>
        </main>

        <Details open={detailsOpen} onClose={() => setDetailsOpen(false)} />
      </div>

      <YearIndex years={years} active={year} />
    </>
  )
}
