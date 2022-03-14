import { useEffect, useState } from 'react'
import { themeState } from '../interfaces/components'

export const useTheme = () => {
  const [theme, setTheme] = useState<themeState>(localStorage.theme || 'dark')
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, colorTheme])
  return [colorTheme, setTheme] as const
}
