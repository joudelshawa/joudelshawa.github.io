import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'

import ContactModal from '@/components/ContactModal'
import DataSourceButton from '@/components/DataSourceButton'
import DataSourceHeading from '@/components/DataSourceHeading'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import ProjectContainer from '@/components/Projects/ProjectContainer'
import Timeline from '@/components/Timeline'
import { DataContext, DataContextType } from '@/contexts/dataContext'
import { IntroContext, IntroContextType } from '@/contexts/introContext'

export default function Home() {
  const { shouldShowIntro } = useContext(IntroContext) as IntroContextType
  const { currentDataSource, setCurrentDataSource } = useContext(
    DataContext
  ) as DataContextType
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    if (selected || contactModalOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [selected, contactModalOpen])

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
      <AnimatePresence mode="wait">
        {currentDataSource === "projects" ? (
          <ProjectContainer key="projects-container" />
        ) : (
          <Timeline key="timeline-container" />
        )}
      </AnimatePresence>
      {contactModalOpen && (
        <ContactModal setContactModalOpen={setContactModalOpen} />
      )}
    </>
  )
}
