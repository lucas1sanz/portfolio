import { useState, useEffect, useCallback, useRef } from 'react'
import { useGameStore } from '@/store/gameStore'

interface RGB { r: number; g: number; b: number }

function randomColor(): RGB {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  }
}

function calcScore(target: RGB, guess: RGB): number {
  const diff = (Math.abs(target.r - guess.r) + Math.abs(target.g - guess.g) + Math.abs(target.b - guess.b)) / 3
  return Math.max(0, Math.round(100 - diff * 0.4))
}

export function useChromaGame() {
  const [target, setTarget] = useState<RGB>(randomColor)
  const [guess, setGuess] = useState<RGB>({ r: 128, g: 128, b: 128 })
  const [timeLeft, setTimeLeft] = useState(15)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { highScore, setHighScore, setCurrentScore } = useGameStore()

  const targetRef = useRef(target)
  const guessRef = useRef(guess)
  const submittedRef = useRef(submitted)

  useEffect(() => { targetRef.current = target }, [target])
  useEffect(() => { guessRef.current = guess }, [guess])
  useEffect(() => { submittedRef.current = submitted }, [submitted])

  const handleSubmit = useCallback(() => {
    if (submittedRef.current) return
    setSubmitted(true)
    submittedRef.current = true
    setRunning(false)
    if (timerRef.current) clearInterval(timerRef.current)
    const s = calcScore(targetRef.current, guessRef.current)
    setScore(s)
    setCurrentScore(s)
    if (s > highScore) setHighScore(s)
  }, [highScore, setHighScore, setCurrentScore])

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const newTarget = randomColor()
    setTarget(newTarget)
    targetRef.current = newTarget
    const newGuess = { r: 128, g: 128, b: 128 }
    setGuess(newGuess)
    guessRef.current = newGuess
    setTimeLeft(15)
    setSubmitted(false)
    submittedRef.current = false
    setScore(null)
    setRunning(true)
  }, [])

  useEffect(() => {
    if (!running || submitted) return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [running, submitted, handleSubmit])

  return { target, guess, setGuess, timeLeft, submitted, score, running, startGame, handleSubmit }
}
