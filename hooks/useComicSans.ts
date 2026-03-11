import { useState, useCallback } from 'react'

export function useComicSans() {
  const [active, setActive] = useState(false)

  const trigger = useCallback(() => {
    if (active) return
    setActive(true)
    document.body.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive'
    setTimeout(() => {
      document.body.style.fontFamily = ''
      setActive(false)
    }, 5000)
  }, [active])

  return { active, trigger }
}
