import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import ContactModal from "@/components/ContactModal"
import DataSourceButton from "@/components/DataSourceButton"
import DataSourceHeading from "@/components/DataSourceHeading"
import Hero from "@/components/Hero"
import Intro from "@/components/Intro"
import ProjectContainer from "@/components/Projects/ProjectContainer"
import Timeline from "@/components/Timeline"
import { useDataContext } from "@/contexts/dataContext"
import { useIntroContext } from "@/contexts/introContext"

export default function Home() {
  const { shouldShowIntro } = useIntroContext()
  const { currentDataSource, setCurrentDataSource } = useDataContext()
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)

  if (shouldShowIntro) return <Intro />

  return (
    <>
      <Hero />
      <motion.div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 rounded-3xl p-4 transition-colors duration-500 sm:flex-row">
        <AnimatePresence mode="wait">
          <DataSourceHeading
            key={currentDataSource}
            currentDataSource={currentDataSource}
          />

          <DataSourceButton
            currentDataSource={currentDataSource}
            setCurrentDataSource={setCurrentDataSource}
          />
        </AnimatePresence>
      </motion.div>
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentDataSource === "projects" ? (
            <ProjectContainer key="projects-container" />
          ) : (
            <Timeline key="timeline-container" />
          )}
        </AnimatePresence>
      </div>
      {contactModalOpen && (
        <ContactModal setContactModalOpen={setContactModalOpen} />
      )}
    </>
  )
}
