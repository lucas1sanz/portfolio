import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GameStore {
  highScore: number
  currentScore: number
  setHighScore: (score: number) => void
  setCurrentScore: (score: number) => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      highScore: 0,
      currentScore: 0,
      setHighScore: (score) => set({ highScore: score }),
      setCurrentScore: (score) => set({ currentScore: score }),
    }),
    { name: 'chroma-game-store' }
  )
)
