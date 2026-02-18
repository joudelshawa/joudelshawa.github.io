import "@/styles/globals.css"

import { AnimatePresence, motion } from "framer-motion"
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google"

import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

import Footer from "@/components/Footer/Footer"
import LivingSunsetBackground from "@/components/LivingSunsetBackground"
import Navbar from "@/components/Navbar/Navbar"
import ContactContextProvider from "@/contexts/contactContext"
import IntroContextProvider from "@/contexts/introContext"
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
  const isInterceptedNavigationRef = useRef(false)
  const [curtainPhase, setCurtainPhase] = useState<"hidden" | "entering" | "covered" | "exiting">("hidden")
  const routeKey = router.asPath.split("#")[0]

  const curtainDurationMs = 420

  const coverWithCurtain = async () => {
    if (typeof window === "undefined") return

    setCurtainPhase("entering")
    lenisRef.current?.lenis?.stop()

    await new Promise<void>((resolve) => {
      window.setTimeout(() => {
        setCurtainPhase("covered")
        resolve()
      }, curtainDurationMs)
    })
  }

  const revealCurtain = () => {
    if (typeof window === "undefined") return
    setCurtainPhase("exiting")
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleAnchorNavigation = async (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as Element | null
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null

      if (!anchor) return
      if (anchor.target && anchor.target !== "_self") return
      if (anchor.hasAttribute("download")) return

      const url = new URL(anchor.href, window.location.href)
      const currentUrl = new URL(window.location.href)

      if (url.origin !== window.location.origin) return

      const isSamePath = url.pathname === currentUrl.pathname && url.search === currentUrl.search
      const isHashOnlyNavigation = isSamePath && Boolean(url.hash)
      const isRouteNavigation = !isSamePath

      if (!isHashOnlyNavigation && !isRouteNavigation) return

      event.preventDefault()

      isInterceptedNavigationRef.current = true

      await coverWithCurtain()

      if (isHashOnlyNavigation) {
        const hash = decodeURIComponent(url.hash.replace(/^#/, ""))
        const targetElement = hash ? document.getElementById(hash) : null

        if (targetElement) {
          lenisRef.current?.lenis?.scrollTo(targetElement, {
            immediate: true,
            force: true,
          })
        }

        window.history.pushState({}, "", `${currentUrl.pathname}${currentUrl.search}${url.hash}`)
        isInterceptedNavigationRef.current = false
        revealCurtain()
        return
      }

      await router.push(`${url.pathname}${url.search}${url.hash}`, undefined, {
        scroll: false,
      })
    }

    document.addEventListener("click", handleAnchorNavigation, true)

    return () => {
      document.removeEventListener("click", handleAnchorNavigation, true)
    }
  }, [router])

  useEffect(() => {
    const handleRouteChangeStart = () => {
      isRouteTransitioningRef.current = true

      if (!isInterceptedNavigationRef.current) {
        setCurtainPhase("entering")
      }

      lenisRef.current?.lenis?.stop()
    }

    const handleRouteChangeError = () => {
      isRouteTransitioningRef.current = false
      isInterceptedNavigationRef.current = false
      revealCurtain()
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
                  {curtainPhase !== "hidden" && (
                    <motion.div
                      aria-hidden
                      initial={{ y: "-100%" }}
                      animate={
                        curtainPhase === "exiting"
                          ? { y: "100%" }
                          : { y: "0%" }
                      }
                      transition={{
                        duration: curtainDurationMs / 1000,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onAnimationComplete={() => {
                        if (curtainPhase === "exiting") {
                          setCurtainPhase("hidden")
                        }
                      }}
                      className="pointer-events-none fixed inset-0 z-40 bg-cream-100"
                    />
                  )}
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
                      isInterceptedNavigationRef.current = false

                      requestAnimationFrame(() => {
                        lenisRef.current?.lenis?.start()
                        revealCurtain()
                      })
                    }}
                  >
                    <motion.div
                      key={routeKey}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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
