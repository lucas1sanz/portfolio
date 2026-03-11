import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Props { score: number; onReplay: () => void }

export default function WinAnimation({ score, onReplay }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 3,
      color: `hsl(${Math.random() * 360}, 90%, 60%)`,
      size: Math.random() * 8 + 4,
      life: 1,
    }))

    let raf: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        p.life -= 0.015
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size * 0.5)
      })
      ctx.globalAlpha = 1
      if (particles.some((p) => p.life > 0)) raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  const isWin = score >= 80

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative text-center"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 py-8">
        <div className="text-6xl mb-4">{isWin ? '🎨' : '😅'}</div>
        <div className="text-4xl font-bold text-white mb-2">Score: {score}</div>
        {isWin ? (
          <p className="text-green-400 text-lg mb-6 italic">
            &quot;You&apos;re basically a human <code>color-picker</code>. W3C should hire you.&quot;
          </p>
        ) : (
          <p className="text-yellow-400 text-lg mb-6 italic">
            &quot;Don&apos;t <em>byte</em> off more than you can chew. Try again!&quot;
          </p>
        )}
        <button
          onClick={onReplay}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  )
}
