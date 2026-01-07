import { useIntroContext } from '@/contexts/introContext'

export default function Footer() {
  const { shouldShowIntro } = useIntroContext()
  return (
    !shouldShowIntro && (
      <footer className="w-full bg-gradient-to-br from-slate-50 to-white px-4 py-16">
        <span className="block text-center font-mono text-lg tracking-tighter text-slate-500">
          © {new Date().getFullYear()} Joud El-Shawa
        </span>
      </footer>
    )
  )
}
