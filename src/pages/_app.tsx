import "@/styles/globals.css"

import { AnimatePresence, motion } from "framer-motion"
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google"

import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

import Footer from "@/components/Footer/Footer"
import LivingSunsetBackground from "@/components/LivingSunsetBackground"
import Navbar from "@/components/Navbar/Navbar"
import ContactContextProvider from "@/contexts/contactContext"
import IntroContextProvider, { IntroContext } from "@/contexts/introContext"
import ProjectContextProvider from "@/contexts/projectContext"
import { ReactLenis } from "lenis/dist/lenis-react"

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
  const router = useRouter()
  const routeKey = router.asPath.split("#")[0]
  const isHomeRoute = router.pathname === "/"

  useEffect(() => {
    if (typeof window === "undefined") return
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  const navLinks = router.pathname === "/" ? [
    { href: "#projects", text: "Projects" },
    { href: "#milestones", text: "Milestones" },
  ] : []

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
            <ReactLenis
              root
              options={{
                lerp: 0.08,
                smoothWheel: true,
                stopInertiaOnNavigate: true,
              }}
            >
              <div
                className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${dmSans.className}`}
              >
                <Navbar navLinks={navLinks} />
                <main>
                  <AnimatePresence
                    mode="wait"
                    initial={router.pathname === "/"}
                    onExitComplete={() => {
                      if (typeof window === "undefined") return
                      window.scrollTo(0, 0)
                    }}
                  >
                    <motion.div
                      key={routeKey}
                      initial={isHomeRoute ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={isHomeRoute ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                      transition={isHomeRoute ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
                    >
                      <Component {...pageProps} />
                    </motion.div>
                  </AnimatePresence>
                </main>
                <Footer />
              </div>
            </ReactLenis>
          </ContactContextProvider>
        </ProjectContextProvider>
      </IntroContextProvider>
    </>
  )
}
