'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import DontClickButton from './DontClickButton'
import { resume } from '@/data/resume'
import { useState, useEffect } from 'react'

const titles = ['Full-Stack Engineer', 'React Enthusiast', 'Node.js Wizard', 'TypeScript Advocate', 'Bug Whisperer']

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = titles[titleIndex]
    if (typing) {
      if (displayed.length < current.length) {
        const timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        return () => clearTimeout(timeout)
      } else {
        setTitleIndex((i) => (i + 1) % titles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, titleIndex])

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl" />
        <div className="orb-3 absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            Lucas <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Sanz</span>
          </h1>
          <div className="text-2xl md:text-3xl text-white/70 mb-2 h-10">
            {displayed}<span className="cursor-blink text-purple-400">|</span>
          </div>
          <p className="text-white/40 text-sm md:text-base mb-10 italic max-w-2xl mx-auto">
            &quot;{resume.tagline}&quot;
          </p>
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 text-left"
        >
          <h2 className="text-white/50 text-xs uppercase tracking-widest mb-3 font-semibold">About</h2>
          <p className="text-white/80 text-lg leading-relaxed">{resume.summary}</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center items-center"
        >
          <a
            href={`https://${resume.contact.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all"
          >
            GitHub
          </a>
          <a
            href={`https://${resume.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
          >
            LinkedIn
          </a>
          <Link
            href="/game"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Play Chroma Matcher
          </Link>
          <DontClickButton />
        </motion.div>
      </div>
    </div>
  )
}
