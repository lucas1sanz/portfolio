'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resume } from '@/data/resume'

export default function SudoUnlock() {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === 'sudo give_job') {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
    setInput('')
  }

  return (
    <div className="mt-8 font-terminal">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-green-600 mb-2 text-lg">
              # Type a command to reveal contact info...
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-green-400 text-xl">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-green-400 text-xl font-terminal caret-green-400"
                placeholder="sudo give_job"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
            {error && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-red-500 text-lg mt-1"
              >
                bash: command not found. Hint: try `sudo give_job`
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-green-800 rounded p-4 bg-green-950/30"
          >
            <p className="text-green-300 text-xl mb-3">[sudo] Access granted. Revealing classified data...</p>
            <div className="space-y-1 text-green-400 text-lg">
              <p>📧 Email: <span className="text-green-300">{resume.contact.email}</span></p>
              <p>📞 Phone: <span className="text-green-300">{resume.contact.phone}</span></p>
              <p>💼 LinkedIn: <span className="text-green-300">{resume.contact.linkedin}</span></p>
              <p>🐙 GitHub: <span className="text-green-300">{resume.contact.github}</span></p>
            </div>
            <p className="text-green-600 text-base mt-3 italic">
              # Great power comes with great resume. Handle with care.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
