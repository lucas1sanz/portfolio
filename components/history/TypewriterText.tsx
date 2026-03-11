'use client'
import { useState, useEffect } from 'react'

interface Props {
  lines: { prompt: string; text: string; delay?: number }[]
  onComplete?: () => void
}

export default function TypewriterText({ lines, onComplete }: Props) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setDone(true)
      onComplete?.()
      return
    }
    const currentLine = lines[lineIndex]
    const startDelay = lineIndex === 0 ? 500 : (currentLine.delay ?? 300)

    if (charIndex === 0 && lineIndex > 0) {
      const t = setTimeout(() => setCharIndex(1), startDelay)
      return () => clearTimeout(t)
    }

    if (charIndex === 0) {
      const t = setTimeout(() => setCharIndex(1), startDelay)
      return () => clearTimeout(t)
    }

    if (charIndex <= currentLine.text.length) {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev]
          next[lineIndex] = currentLine.text.slice(0, charIndex)
          return next
        })
        setCharIndex((c) => c + 1)
      }, 35)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1)
        setCharIndex(0)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [lineIndex, charIndex, lines, onComplete])

  return (
    <div className="space-y-1">
      {lines.map((line, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-green-600 shrink-0">{line.prompt}</span>
          <span className="text-green-400">
            {displayedLines[i] ?? ''}
            {i === lineIndex && !done && <span className="cursor-blink">█</span>}
          </span>
        </div>
      ))}
    </div>
  )
}
