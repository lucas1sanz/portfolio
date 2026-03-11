'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SkillIcon from './SkillIcon'
import { resume } from '@/data/resume'

const allSkills: { category: string; skills: string[] }[] = Object.entries(resume.skills).map(
  ([category, skills]) => ({ category, skills })
)

export default function PhysicsContainer() {
  const [zeroG, setZeroG] = useState(false)
  const resetKey = 0

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20 pb-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Skills</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto italic">
            &quot;I have a <strong>solid</strong> grasp of these technologies. Throw them around if you don&apos;t believe me.&quot;
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={() => setZeroG(!zeroG)}
              className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                zeroG
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {zeroG ? '🌍 Back to Earth' : '🚀 Zero-G Mode'}
            </button>
          </div>
        </motion.div>

        {/* Skill categories */}
        {allSkills.map(({ category, skills }, catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="mb-10"
          >
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">{category}</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <SkillIcon
                  key={skill}
                  skill={skill}
                  index={catIndex * 6 + i}
                  category={category}
                  zeroG={zeroG}
                  resetKey={resetKey}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
