import { useEffect, useRef, useState } from "react"

import { Tail } from "@/components/thread/Bubble"

/**
 * A picture she sent with a milestone, as a photo message. When it ends a run
 * it carries the tail, coloured like the photo's bottom-left corner, which is
 * how Messages draws a tail under a photo. Tapping opens the full image.
 */
export default function PhotoBubble({
  photo,
  tail = false,
}: {
  photo: Photo
  tail?: boolean
}) {
  const image = useRef<HTMLImageElement>(null)
  const [tailColor, setTailColor] = useState<string | null>(null)

  const sampleCorner = () => {
    const element = image.current
    if (!tail || !element?.naturalWidth) return
    try {
      const canvas = document.createElement("canvas")
      canvas.width = 8
      canvas.height = 4
      const context = canvas.getContext("2d")
      if (!context) return
      const { naturalWidth: w, naturalHeight: h } = element
      context.drawImage(element, 0, h * 0.94, w * 0.08, h * 0.06, 0, 0, 8, 4)
      const data = context.getImageData(0, 0, 8, 4).data
      const sum = [0, 0, 0]
      for (let i = 0; i < data.length; i += 4) {
        sum[0] += data[i]
        sum[1] += data[i + 1]
        sum[2] += data[i + 2]
      }
      const n = data.length / 4
      setTailColor(`rgb(${sum.map((v) => Math.round(v / n)).join(" ")})`)
    } catch {}
  }

  useEffect(() => {
    if (image.current?.complete) sampleCorner()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <li className="row row-her">
      <a
        className="bubble bubble-flush photo"
        href={photo.src}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={image}
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={sampleCorner}
        />
        {tail && tailColor ? <Tail style={{ fill: tailColor }} /> : null}
      </a>
    </li>
  )
}
