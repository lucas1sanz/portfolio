'use client'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useRef, useState } from 'react'

interface Props {
  skill: string
  index: number
  zeroG: boolean
  originX: number
  originY: number
}

const categoryColors: Record<string, string> = {
  Frontend: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
  Backend: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
  Database: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
  DevOps: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
  Tools: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
}

export default function SkillIcon({ skill, zeroG, index }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const category = Object.keys(categoryColors)[Math.floor(index / 6)] || 'Frontend'
  const colorClass = categoryColors[category] || categoryColors.Frontend

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 200, friction: 20 },
  }))

  // Zero-G floating animation
  const floatOffset = useRef({ x: Math.random() * 20 - 10, y: Math.random() * 20 - 10 })
  const animFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // Use a ref to track zeroG state for the animation loop
  const zeroGRef = useRef(zeroG)
  zeroGRef.current = zeroG
  const isDraggingRef = useRef(isDragging)
  isDraggingRef.current = isDragging

  // Start/stop floating animation based on zeroG
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
        x: Math.sin(elapsed * 0.8 + index) * floatOffset.current.x,
        y: Math.cos(elapsed * 0.6 + index * 0.7) * floatOffset.current.y,
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
    api.start({ x: 0, y: 0 })
  }

  const bind = useDrag(({ active, movement: [mx, my], velocity: [vx, vy] }) => {
    setIsDragging(active)
    isDraggingRef.current = active
    if (active) {
      api.set({ x: mx, y: my })
    } else {
      // Spring back with throw physics
      api.start({
        x: 0,
        y: 0,
        config: {
          tension: 120 + Math.abs(vx) * 50,
          friction: 14,
          velocity: [vx * 5, vy * 5],
        },
      })
      if (zeroGRef.current) {
        setTimeout(startFloating, 500)
      }
    }
  }, { filterTaps: true })

  return (
    <animated.div
      {...bind()}
      style={{ x, y, touchAction: 'none' }}
      className={`
        inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium
        cursor-grab active:cursor-grabbing select-none transition-colors
        ${colorClass}
        ${isDragging ? 'shadow-xl scale-110 z-50' : 'shadow-sm'}
      `}
    >
      {skill}
    </animated.div>
  )
}
