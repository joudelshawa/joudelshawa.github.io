import { gen } from "culler"
import { motion, useAnimate } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

import { useIntroContext } from "@/contexts/introContext"
import useScreenSize from "@/hooks/use-screen-size"
import { ease } from "@/utils/framer"
import { useLenis } from "@studio-freight/react-lenis"

import TextMask from "../TextMask"

type Props = {
  expanded: boolean
}

export default function Orb({ expanded }: Props) {
  const router = useRouter()
  const lenis = useLenis()
  const [scope, animate] = useAnimate()
  const { isMobile } = useScreenSize()
  const { shouldShowIntro } = useIntroContext()
  const orbColors = [
    "#C4654A",
    "#D4836C",
    "#7A8B6F",
    "#98A88E",
    "#D9A494",
    "#B8C4B0",
  ]
  const [color, setColor] = useState<string>(
    orbColors[Math.floor(Math.random() * orbColors.length)]
  )

  async function orbAnimation() {
    await animate(scope.current, {
      opacity: 0,
      transition: {
        duration: 2,
        ease: ease,
        delay: shouldShowIntro ? 4 : 0,
      },
    })

    setColor(orbColors[Math.floor(Math.random() * orbColors.length)])

    await animate(scope.current, {
      opacity: 1,
      transition: {
        ease,
      },
    })
  }

  function handleNavigate(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (router.pathname !== "/") {
      e.preventDefault()
      console.log("scrolling to top")
      router.push("/")
    }
  }

  return (
    <Link href="#hero" onClick={handleNavigate}>
      <motion.div layout="position" className="flex">
        <motion.div
          onPointerEnter={orbAnimation}
          ref={scope}
          className="orb inset-0 aspect-square h-5 w-5 cursor-pointer rounded-full shadow active:cursor-grabbing"
          style={{
            background: color,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div className="relative flex  items-start px-2">
          <div onPointerEnter={orbAnimation}>
            <TextMask
              type="letter"
              className="whitespace-nowrap font-mono text-sm font-medium tracking-widest text-ink"
            >
              {isMobile && expanded ? "" : "JOUD.SHAWA.DEV"}
            </TextMask>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  )
}
