import ContactSection from "@/components/Contact/ContactSection"
import Hero from "@/components/Hero"
import Intro from "@/components/Intro"
import ProjectSection from "@/components/Projects/ProjectSection"
import TimelineSection from "@/components/Timeline/TimelineSection"
import { useIntroContext } from "@/contexts/introContext"

export default function Home() {
  const { shouldShowIntro } = useIntroContext()

  if (shouldShowIntro) return <Intro />

  return (
    <>
      <Hero />
      <ProjectSection />
      <TimelineSection />
      <ContactSection />
    </>
  )
}
