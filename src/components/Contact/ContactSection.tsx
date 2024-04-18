import ContactDetails from "./ContactDetails"

export default function ContactSection() {
  return (
    <section className="inner relative flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-[clamp(3rem,1.0356rem+2.8275vw,4.75rem)] font-semibold tracking-tighter text-white">
        Contact me
      </h1>

      <ContactDetails />
    </section>
  )
}
