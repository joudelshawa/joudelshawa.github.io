import { AnimatePresence } from "framer-motion"

import ContactButton from "@/components/Contact/ContactButton"
import ContactSection from "@/components/Contact/ContactModal"
import Hero from "@/components/Hero/Hero"
import Intro from "@/components/Hero/Intro"
import ProjectSection from "@/components/Projects/ProjectSection"
import TimelineSection from "@/components/Timeline/TimelineSection"
import { useContactContext } from "@/contexts/contactContext"
import { useIntroContext } from "@/contexts/introContext"

export default function Home() {
  const { shouldShowIntro } = useIntroContext()
  const { modalOpen } = useContactContext()

  if (shouldShowIntro) return <Intro />

  return (
    <>
      <Hero />
      <ProjectSection />
      <TimelineSection />
      <ContactButton />
      <AnimatePresence>{modalOpen && <ContactSection />}</AnimatePresence>
    </>
  )
}
