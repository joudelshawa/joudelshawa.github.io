import { AnimatePresence, motion, useScroll } from "framer-motion"
import { useContext, useEffect, useRef, useState } from "react"

import ContactModal from "@/components/ContactModal"
import DataSourceButton from "@/components/DataSourceButton"
import DataSourceHeading from "@/components/DataSourceHeading"
import Loader from "@/components/Loader"
import Projects from "@/components/Projects"
import TextBubbles from "@/components/TextBubbles"
import TextMask from "@/components/TextMask"
import Timeline from "@/components/Timeline"
import { DataContext, DataContextType } from "@/contexts/dataContext"
import { IntroContext, IntroContextType } from "@/contexts/introContext"
import { ease } from "@/utils/framer"

export default function Home() {
  const { shouldShowIntro } = useContext(IntroContext) as IntroContextType
  const { currentDataSource, setCurrentDataSource } = useContext(
    DataContext
  ) as DataContextType
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<Project | null>(null)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: scrollContainerRef })

  console.log("rendering home page")
  useEffect(() => {
    if (selected || contactModalOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [selected, contactModalOpen])

  if (shouldShowIntro)
    return (
      <Loader
        contactModalOpen={contactModalOpen}
        setContactModalOpen={setContactModalOpen}
      />
    )

  return (
    <>
      <motion.section
        ref={scrollContainerRef}
        className="h-[300vh] overflow-x-clip bg-gradient-to-b from-pink-100 via-violet-100 to-white  px-4"
      >
        <motion.div className="sticky left-0 top-0 mx-auto mb-4 grid h-screen max-w-7xl grid-cols-1 items-center gap-4 md:grid-cols-[2fr_1fr]">
          <TextBubbles scrollYProgress={scrollYProgress} />
          <motion.div
            initial={{
              x: 10,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { ease, duration: 1 },
            }}
            className="z-0 hidden h-min min-h-[30rem] rounded-3xl bg-[url('/me.jpg')] bg-cover bg-center md:block "
          ></motion.div>
        </motion.div>
      </motion.section>
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
          <Projects selected={selected} setSelected={setSelected} />
        ) : (
          <Timeline />
        )}
      </AnimatePresence>
      {contactModalOpen && (
        <ContactModal setContactModalOpen={setContactModalOpen} />
      )}
    </>
  )
}
