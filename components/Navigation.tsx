'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isHistory = pathname.includes('/history')
  const isSkills = pathname.includes('/skills')
  const isGame = pathname.includes('/game')

  if (isHistory) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-green-800 px-6 py-3 font-terminal">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-green-400 text-xl">lucas@portfolio:~$</span>
          <div className="flex gap-6 text-green-600">
            <Link href="/" className="hover:text-green-400 transition-colors">[home]</Link>
            <span className="text-green-400">[history]</span>
            <Link href="/skills" className="hover:text-green-400 transition-colors">[skills]</Link>
            <Link href="/game" className="hover:text-green-400 transition-colors">[game]</Link>
          </div>
        </div>
      </nav>
    )
  }

  if (isSkills) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg">Lucas Sanz</span>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/history" className="text-gray-600 hover:text-gray-900 transition-colors">History</Link>
            <span className="text-purple-600 font-semibold">Skills</span>
            <Link href="/game" className="text-gray-600 hover:text-gray-900 transition-colors">Game</Link>
          </div>
        </div>
      </nav>
    )
  }

  if (isGame) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-white font-bold text-lg">Chroma Matcher</span>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/history" className="text-gray-400 hover:text-white transition-colors">History</Link>
            <Link href="/skills" className="text-gray-400 hover:text-white transition-colors">Skills</Link>
            <span className="text-yellow-400 font-semibold">Game</span>
          </div>
        </div>
      </nav>
    )
  }

  // Default: Hero glassmorphic nav
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="text-white font-bold text-lg">Lucas Sanz</span>
        <div className="flex gap-6 text-sm font-medium">
          <span className="text-white/90">Home</span>
          <Link href="/history" className="text-white/60 hover:text-white transition-colors">History</Link>
          <Link href="/skills" className="text-white/60 hover:text-white transition-colors">Skills</Link>
          <Link href="/game" className="text-white/60 hover:text-white transition-colors">Game</Link>
        </div>
      </div>
    </nav>
  )
}
