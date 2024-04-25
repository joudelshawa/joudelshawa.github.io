import ContactButton from '@/components/Contact/ContactButton'
import ContactSection from '@/components/Contact/ContactSection'
import Hero from '@/components/Hero/Hero'
import Intro from '@/components/Hero/Intro'
import ProjectSection from '@/components/Projects/ProjectSection'
import TimelineSection from '@/components/Timeline/TimelineSection'
import { useIntroContext } from '@/contexts/introContext'

export default function Home() {
  const { shouldShowIntro } = useIntroContext()

  if (shouldShowIntro) return <Intro />

  return (
    <>
      <Hero />
      <ProjectSection />
      <TimelineSection />
      <ContactButton />
    </>
  )
}
