import { useIntroContext } from "@/contexts/introContext"

export default function Footer() {
  const { shouldShowIntro } = useIntroContext()
  
  if (shouldShowIntro) return null

  return (
    <div 
      className="relative h-[500px] md:h-[600px]"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="relative h-[calc(100vh+500px)] md:h-[calc(100vh+600px)] -top-[100vh]">
        <div className="sticky top-[calc(100vh-500px)] md:top-[calc(100vh-600px)] h-[500px] md:h-[600px] w-full">
          <footer className="flex h-full w-full flex-col justify-end overflow-hidden border-t border-ink/[0.06] bg-cream-100">
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-6 md:flex-row md:items-end">
              
              {/* CTA */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <span className="mb-4 font-mono text-sm uppercase tracking-widest text-ink-subtle">
                  Ready to collaborate?
                </span>
                <a 
                  href="mailto:jelshawa@gmail.com" 
                  className="group flex flex-col font-display text-[15vw] leading-[0.9] tracking-tight text-ink transition-colors hover:text-terracotta sm:flex-row sm:gap-4 sm:text-7xl lg:text-[7rem]"
                >
                  <span className="transition-transform duration-300 group-hover:-translate-y-2">Let&apos;s</span>
                  <span className="text-ink-muted transition-transform duration-300 group-hover:translate-y-2">connect.</span>
                </a>
              </div>

              {/* Social Links & Resume */}
              <div className="flex flex-col items-center gap-6 md:items-end md:gap-8">
                <div className="flex gap-4">
                  <a
                    href="https://github.com/joudelshawa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="group flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 bg-cream-50 text-ink-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-cream-50 hover:shadow-md"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/joudelshawa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 bg-cream-50 text-ink-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-cream-50 hover:shadow-md"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="/resume.pdf"
                    download="Joud_ElShawa_Resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Resume"
                    className="group flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 bg-cream-50 text-ink-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-terracotta hover:bg-terracotta hover:text-cream-50 hover:shadow-md"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </a>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-ghost">
                  &copy; {new Date().getFullYear()} JOUD EL-SHAWA
                </span>
              </div>
            </div>

            {/* Large BG Name */}
            <div className="pointer-events-none mt-16 flex w-full select-none justify-center overflow-hidden leading-[0.75] md:mt-24">
              <span className="whitespace-nowrap font-display text-[15.5vw] font-bold tracking-tighter text-ink/[0.03]">
                JOUD EL-SHAWA
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

