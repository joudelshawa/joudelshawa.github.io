import { AnimatePresence, motion } from "framer-motion"

import Hero from "@/components/Hero/Hero"
import Intro from "@/components/Hero/Intro"
import MilestoneSection from "@/components/Milestones/MilestoneSection"
import Navbar from "@/components/Navbar/Navbar"
import ProjectSection from "@/components/Projects/ProjectSection"
import { useContactContext } from "@/contexts/contactContext"
import { useIntroContext } from "@/contexts/introContext"
import useScreenSize from "@/hooks/use-screen-size"

const navLinks = [
  { href: "#projects", text: "Projects" },
  { href: "#milestones", text: "Milestones" },
]

export default function Home() {
  const { isMobile } = useScreenSize()
  const { shouldShowIntro } = useIntroContext()
  const { modalOpen } = useContactContext()

  if (shouldShowIntro) return <Intro />

  return (
    <>
      <Navbar key="navbar" navLinks={navLinks} />

      <Hero />
      <ProjectSection />
      <MilestoneSection />
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
