import { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../tailwind.config'

type Screensize = "sm" | "md" | "lg" | "xl" | "2xl"

const fullConfig = resolveConfig(tailwindConfig)
export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<Screensize>()
  const [pixelWidth, setPixelWidth] = useState<number>(window.innerWidth)

  const getScreenSize = () => {
    const screens = { ...fullConfig.theme.screens }

    const { sm, md, lg, xl } = {
      sm: parseInt(screens.sm),
      md: parseInt(screens.md),
      lg: parseInt(screens.lg),
      xl: parseInt(screens.xl),
    }

    const width = window.innerWidth

    setPixelWidth(width)

    if (width < sm) setScreenSize("sm")
    else if (width < md) setScreenSize("md")
    else if (width < lg) setScreenSize("lg")
    else if (width < xl) setScreenSize("xl")
    else setScreenSize("2xl")
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timer)
      timer = setTimeout(getScreenSize, 1000)
    }
    getScreenSize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { screenSize, pixelWidth }
}
