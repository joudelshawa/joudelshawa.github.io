/**
 * Colours each photo message's tail like the photo's bottom-left corner,
 * which is how Messages draws a tail under a photo. Without JS there's no tail.
 */
const sample = (link: HTMLElement) => {
  const image = link.querySelector("img")
  const tail = link.querySelector<SVGElement>(".tail-pending")
  if (!image || !tail || !image.naturalWidth) return
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 8
    canvas.height = 4
    const context = canvas.getContext("2d")
    if (!context) return
    const { naturalWidth: w, naturalHeight: h } = image
    context.drawImage(image, 0, h * 0.94, w * 0.08, h * 0.06, 0, 0, 8, 4)
    const data = context.getImageData(0, 0, 8, 4).data
    const sum = [0, 0, 0]
    for (let i = 0; i < data.length; i += 4) {
      sum[0] += data[i]
      sum[1] += data[i + 1]
      sum[2] += data[i + 2]
    }
    const n = data.length / 4
    tail.style.fill = `rgb(${sum.map((v) => Math.round(v / n)).join(" ")})`
    tail.classList.remove("tail-pending")
  } catch {}
}

document.querySelectorAll<HTMLElement>("[data-photo]").forEach((link) => {
  const image = link.querySelector("img")
  if (!image || !link.querySelector(".tail-pending")) return
  if (image.complete) sample(link)
  else image.addEventListener("load", () => sample(link), { once: true })
})
