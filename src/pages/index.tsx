import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero/Hero'
import Intro from '@/components/Hero/Intro'
import MilestoneSection from '@/components/Milestones/MilestoneSection'
import Navbar from '@/components/Navbar/Navbar'
import ProjectSection from '@/components/Projects/ProjectSection'
import { useContactContext } from '@/contexts/contactContext'
import { useIntroContext } from '@/contexts/introContext'
import useScreenSize from '@/hooks/use-screen-size'
import { useLenis } from '@studio-freight/react-lenis'

const navLinks = [
  { href: "#projects", text: "Projects" },
  { href: "#milestones", text: "Milestones" },
]

export default function Home() {
  const { isMobile } = useScreenSize()
  const { shouldShowIntro } = useIntroContext()
  const { modalOpen } = useContactContext()
  const lenis = useLenis()

  useEffect(() => {
    if (modalOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [modalOpen])

  if (shouldShowIntro) return <Intro />

  return (
    <>
      <Navbar key="navbar" navLinks={navLinks} />

      <Hero />
      <ProjectSection />
      <MilestoneSection />
      <Footer />
      <AnimatePresence>
        {modalOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.2,
            }}
            className="fixed inset-0 h-screen w-screen backdrop-blur-xl"
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
