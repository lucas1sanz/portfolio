'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import SudoUnlock from './SudoUnlock'
import { resume } from '@/data/resume'

const introLines = [
  { prompt: '$', text: 'whoami' },
  { prompt: '>', text: 'Lucas Sanz — Full-Stack Engineer', delay: 600 },
  { prompt: '$', text: 'cat about.txt', delay: 800 },
  { prompt: '>', text: resume.summary, delay: 400 },
  { prompt: '$', text: 'git log --oneline | head -3', delay: 800 },
  { prompt: '>', text: 'a1b2c3d feat: shipped 3 features before coffee', delay: 300 },
  { prompt: '>', text: '4e5f6a7 fix: removed feature, not bug (classic)', delay: 200 },
  { prompt: '>', text: '8b9c0d1 chore: pretended to document things', delay: 200 },
]

export default function Terminal() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <div className="crt-effect min-h-screen bg-black text-green-400 font-terminal px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="border border-green-800 rounded-t p-3 mb-0 bg-green-950/20">
            <div className="flex gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <p className="text-green-600 text-lg">lucas@portfolio — bash — 120×40</p>
          </div>

          {/* Terminal body */}
          <div className="border border-t-0 border-green-800 rounded-b p-6 bg-black/90 text-xl leading-relaxed">
            <TypewriterText lines={introLines} onComplete={() => setIntroComplete(true)} />

            {introComplete && (
              <>
                {/* Work Experience */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <p className="text-green-600 mb-4">$ cat experience.json | jq &apos;.&apos;</p>
                  {resume.experience.map((exp, i) => (
                    <div key={i} className="mb-6 pl-4 border-l border-green-800">
                      <p className="text-green-300">▶ {exp.role} @ {exp.company}</p>
                      <p className="text-green-600 text-lg">{exp.period}</p>
                      <p className="text-green-400 mt-1">{exp.description}</p>
                      <p className="text-green-700 text-base mt-1">
                        [{exp.tech.join(', ')}]
                      </p>
                    </div>
                  ))}
                </motion.div>

                {/* Pun */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className="mt-6 p-4 border border-green-900 bg-green-950/20 rounded text-green-600 text-lg italic"
                >
                  <p># My commit history is cleaner than my apartment.</p>
                  <p># `git blame` me later.</p>
                </motion.div>

                <SudoUnlock />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
