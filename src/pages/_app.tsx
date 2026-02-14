import "@/styles/globals.css"

import { AnimatePresence, motion } from "framer-motion"
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google"

import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

import Footer from "@/components/Footer/Footer"
import LivingSunsetBackground from "@/components/LivingSunsetBackground"
import Navbar from "@/components/Navbar/Navbar"
import ContactContextProvider from "@/contexts/contactContext"
import IntroContextProvider, { IntroContext } from "@/contexts/introContext"
import ProjectContextProvider from "@/contexts/projectContext"
import { ReactLenis } from "lenis/dist/lenis-react"
import type { LenisRef } from "lenis/dist/lenis-react"

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
  const lenisRef = useRef<LenisRef>(null)
  const isRouteTransitioningRef = useRef(false)
  const routeKey = router.asPath.split("#")[0]

  useEffect(() => {
    if (typeof window === "undefined") return
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    const handleRouteChangeStart = () => {
      isRouteTransitioningRef.current = true
      lenisRef.current?.lenis?.stop()
    }

    const handleRouteChangeError = () => {
      isRouteTransitioningRef.current = false
      lenisRef.current?.lenis?.start()
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeError", handleRouteChangeError)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeError", handleRouteChangeError)
    }
  }, [router.events])

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
              ref={lenisRef}
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
                <main className="relative overflow-x-clip">
                  <AnimatePresence
                    mode="wait"
                    initial={router.pathname === "/"}
                    onExitComplete={() => {
                      if (!isRouteTransitioningRef.current || typeof window === "undefined") return

                      lenisRef.current?.lenis?.scrollTo(0, {
                        immediate: true,
                        force: true,
                      })
                      window.scrollTo(0, 0)
                      isRouteTransitioningRef.current = false

                      requestAnimationFrame(() => {
                        lenisRef.current?.lenis?.start()
                      })
                    }}
                  >
                    <motion.div
                      key={routeKey}
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(1px)" }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="relative"
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
