import { AnimatePresence } from 'framer-motion'

import ContactButton from '@/components/Contact/ContactButton'
import ContactModal from '@/components/Contact/ContactModal'
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import Intro from '@/components/Hero/Intro'
import MilestoneSection from '@/components/Milestones/MilestoneSection'
import ProjectSection from '@/components/Projects/ProjectSection'
import { useContactContext } from '@/contexts/contactContext'
import { useIntroContext } from '@/contexts/introContext'

export default function Home() {
  const { shouldShowIntro } = useIntroContext()
  const { modalOpen } = useContactContext()

  if (shouldShowIntro) return <Intro />

  return (
    <>
      <Hero />
      <ProjectSection />
      <MilestoneSection />
      <AnimatePresence>{modalOpen && <ContactModal />}</AnimatePresence>
      <Footer />
    </>
  )
}
