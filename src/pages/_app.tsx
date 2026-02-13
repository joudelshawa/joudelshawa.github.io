import "@/styles/globals.css"

import { AnimatePresence, motion } from "framer-motion"
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google"

import Head from "next/head"

import Footer from "@/components/Footer/Footer"
import LivingSunsetBackground from "@/components/LivingSunsetBackground"
import Navbar from "@/components/Navbar/Navbar"
import ContactContextProvider from "@/contexts/contactContext"
import IntroContextProvider, { IntroContext } from "@/contexts/introContext"
import ProjectContextProvider from "@/contexts/projectContext"
import { ReactLenis } from "@studio-freight/react-lenis"

import type { AppProps } from "next/app"
import MouseTrail from "@/components/MouseTrail"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Joud El-Shawa</title>
        <meta name="description" content="Joud El-Shawa" />
      </Head>
      <IntroContextProvider>
        <ProjectContextProvider>
          <ContactContextProvider>
            <LivingSunsetBackground />
            <MouseTrail />
            <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
              <main
                className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${dmSans.className}`}
              >
                <Component {...pageProps} />
              </main>
              <Footer />
            </ReactLenis>
          </ContactContextProvider>
        </ProjectContextProvider>
      </IntroContextProvider>
    </>
  )
}
