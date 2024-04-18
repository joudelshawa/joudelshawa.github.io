import "@/styles/globals.css"

import { AnimatePresence, motion } from "framer-motion"
import { Inter } from "next/font/google"
import Head from "next/head"
import { useEffect, useState } from "react"

import Navbar from "@/components/Navbar"
import DataContextProvider, { DataContext } from "@/contexts/dataContext"
import IntroContextProvider, { IntroContext } from "@/contexts/introContext"
import ProjectContextProvider from "@/contexts/projectContext"
import Lenis from "@studio-freight/lenis"

import type { AppProps } from "next/app"
const interFont = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const lenis = new Lenis({})

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <>
      <Head>
        <title>Joud El-Shawa&apos;s Portfolio</title>
        <meta name="description" content="Joud El-Shawa's Portfolio" />
      </Head>
      <IntroContextProvider>
        <DataContextProvider>
          <ProjectContextProvider>
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.div
                key={Component.name}
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                className={`${interFont.className}`}
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                  },
                  pageExit: {
                    opacity: 0,
                  },
                }}
              >
                <main className={`${interFont.className}`}>
                  <Component {...pageProps} />
                </main>
              </motion.div>
            </AnimatePresence>
          </ProjectContextProvider>
        </DataContextProvider>
      </IntroContextProvider>
    </>
  )
}
