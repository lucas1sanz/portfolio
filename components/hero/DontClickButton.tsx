'use client'
import { motion, useAnimate } from 'framer-motion'
import { useComicSans } from '@/hooks/useComicSans'

export default function DontClickButton() {
  const { active, trigger } = useComicSans()
  const [scope, animate] = useAnimate()

  const handleClick = async () => {
    trigger()
    await animate(scope.current, { x: [-5, 5, -5, 5, -3, 3, 0] }, { duration: 0.5 })
  }

  return (
    <motion.button
      ref={scope}
      onClick={handleClick}
      className="px-4 py-2 border border-white/20 rounded-lg text-white/40 text-sm hover:text-white/60 hover:border-white/40 transition-all cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {active ? '😱 Oh no...' : "Don't Click This"}
    </motion.button>
  )
}
