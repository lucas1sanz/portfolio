'use client'
import { useChromaGame } from '@/hooks/useChromaGame'
import ColorSliders from './ColorSliders'
import WinAnimation from './WinAnimation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

export default function ChromaMatcher() {
  const { target, guess, setGuess, timeLeft, submitted, score, running, startGame, handleSubmit } = useChromaGame()
  const { highScore } = useGameStore()

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 pt-20 pb-10">
      <div className="max-w-2xl w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Chroma Matcher</h1>
          <p className="text-gray-400">Match the target color using the RGB sliders</p>
          {highScore > 0 && (
            <p className="text-yellow-400 text-sm mt-1">🏆 High Score: {highScore}</p>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {!running && !submitted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 mb-6 text-lg">
                You have 15 seconds to match a random color.<br />
                How well can you <em>see</em> the difference?
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-lg font-bold rounded-2xl hover:opacity-90 transition shadow-lg"
              >
                Start Game
              </button>
            </motion.div>
          ) : submitted && score !== null ? (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WinAnimation score={score} onReplay={startGame} />
            </motion.div>
          ) : (
            <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Timer */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 text-sm">Time Left</span>
                <span className={`text-2xl font-bold font-mono ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>

              {/* Color swatches */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 text-center">Target</p>
                  <div
                    className="h-32 rounded-2xl border border-gray-700 shadow-inner"
                    style={{ backgroundColor: rgbToHex(target) }}
                  />
                  <p className="text-gray-500 text-sm text-center mt-2 font-mono">{rgbToHex(target)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 text-center">Your Guess</p>
                  <div
                    className="h-32 rounded-2xl border border-gray-700 shadow-inner"
                    style={{ backgroundColor: rgbToHex(guess) }}
                  />
                  <p className="text-gray-500 text-sm text-center mt-2 font-mono">{rgbToHex(guess)}</p>
                </div>
              </div>

              {/* Sliders */}
              <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
                <ColorSliders value={guess} onChange={setGuess} />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-lg font-bold rounded-2xl hover:opacity-90 transition"
              >
                Submit Color
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
