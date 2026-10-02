/**
 * Apple's `.snappy` spring (stiffness 158, damping 21, mass 1) sampled into a
 * CSS `linear()` easing, so arrivals run on the compositor without a library.
 */
export function springEasing({
  stiffness = 158,
  damping = 21,
  mass = 1,
  samples = 40,
} = {}) {
  const w0 = Math.sqrt(stiffness / mass)
  const zeta = damping / (2 * Math.sqrt(stiffness * mass))

  const position = (t: number) => {
    if (zeta < 1) {
      const wd = w0 * Math.sqrt(1 - zeta * zeta)
      return (
        1 -
        Math.exp(-zeta * w0 * t) *
          (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t))
      )
    }
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t)
  }

  // Settled once the spring stays within 0.1% of rest.
  let settle = 0
  for (let t = 0; t < 3; t += 1 / 240) {
    if (Math.abs(1 - position(t)) > 0.001) settle = t
  }

  const points = Array.from({ length: samples + 1 }, (_, i) =>
    Number(position((settle * i) / samples).toFixed(4))
  )
  points[samples] = 1

  const supported =
    typeof CSS !== "undefined" &&
    CSS.supports("transition-timing-function", "linear(0, 1)")

  return {
    easing: supported
      ? `linear(${points.join(", ")})`
      : "cubic-bezier(0.2, 0.9, 0.25, 1)",
    duration: Math.round(settle * 1000),
  }
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/** Lands an element with the spring, from just below and slightly small. */
export function land(element: Element, delay = 0) {
  if (prefersReducedMotion()) return
  const { easing, duration } = springEasing()
  element.animate(
    [
      { opacity: 0, transform: "translateY(8px) scale(0.93)" },
      { opacity: 1, transform: "none" },
    ],
    { duration, easing, delay, fill: "backwards" }
  )
}
