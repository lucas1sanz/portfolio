'use client'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useRef, useEffect, useState } from 'react'

interface Props {
  skill: string
  index: number
  category: string
  zeroG: boolean
  resetKey: number
}

const categoryColors: Record<string, string> = {
  Frontend: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
  Backend: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
  Database: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
  DevOps: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
  Tools: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
}

export default function SkillIcon({ skill, index, category, zeroG, resetKey }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const colorClass = categoryColors[category] ?? categoryColors.Frontend

  // Accumulated offset so position is saved after dragging
  const offset = useRef({ x: 0, y: 0 })

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 200, friction: 20 },
  }))

  // Reset when resetKey changes
  useEffect(() => {
    offset.current = { x: 0, y: 0 }
    api.start({ x: 0, y: 0, config: { tension: 200, friction: 20 } })
  }, [resetKey, api])

  // Zero-G floating
  const floatSeed = useRef({ x: Math.random() * 20 - 10, y: Math.random() * 20 - 10 })
  const animFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const zeroGRef = useRef(zeroG)
  zeroGRef.current = zeroG
  const isDraggingRef = useRef(isDragging)
  isDraggingRef.current = isDragging

  const startFloating = () => {
    if (animFrameRef.current) return
    startTimeRef.current = performance.now()
    const animate = (now: number) => {
      if (!zeroGRef.current || isDraggingRef.current) {
        animFrameRef.current = null
        return
      }
      const elapsed = (now - (startTimeRef.current ?? now)) / 1000
      api.set({
        x: offset.current.x + Math.sin(elapsed * 0.8 + index) * floatSeed.current.x,
        y: offset.current.y + Math.cos(elapsed * 0.6 + index * 0.7) * floatSeed.current.y,
      })
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)
  }

  if (zeroG && !isDragging && !animFrameRef.current) {
    startFloating()
  } else if (!zeroG && animFrameRef.current) {
    cancelAnimationFrame(animFrameRef.current)
    animFrameRef.current = null
    api.start({ x: offset.current.x, y: offset.current.y })
  }

  const bind = useDrag(({ active, movement: [mx, my], velocity: [vx] }) => {
    setIsDragging(active)
    isDraggingRef.current = active
    if (active) {
      api.set({ x: offset.current.x + mx, y: offset.current.y + my })
    } else {
      // Save the new resting position
      offset.current = { x: offset.current.x + mx, y: offset.current.y + my }
      api.start({
        x: offset.current.x,
        y: offset.current.y,
        config: { tension: 120 + Math.abs(vx) * 40, friction: 14 },
      })
      if (zeroGRef.current) setTimeout(startFloating, 400)
    }
  }, { filterTaps: true })

  return (
    <animated.div
      {...bind()}
      style={{ x, y, touchAction: 'none', position: 'relative', zIndex: isDragging ? 50 : 1 }}
      className={`
        inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium
        cursor-grab active:cursor-grabbing select-none transition-colors
        ${colorClass}
        ${isDragging ? 'shadow-xl scale-110' : 'shadow-sm'}
      `}
    >
      {skill}
    </animated.div>
  )
}
