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
import { ReactLenis, useLenis } from "lenis/dist/lenis-react"

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

function RouteScrollReset() {
  const router = useRouter()
  const lenis = useLenis()

  useEffect(() => {
    if (typeof window === "undefined") return

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"

    const handleRouteChangeComplete = (url: string) => {
      if (url.includes("#")) return

      lenis?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
      requestAnimationFrame(() => window.scrollTo(0, 0))
    }

    router.events.on("routeChangeComplete", handleRouteChangeComplete)

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [lenis, router.events])

  return null
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
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
            <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
              <RouteScrollReset />
              <Navbar navLinks={navLinks} />
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
