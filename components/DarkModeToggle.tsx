'use client'

import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored === 'true' || (prefersDark && stored !== 'false')
    setIsDark(dark)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.setAttribute('data-dark-mode', 'true')
      localStorage.setItem('darkMode', 'true')
      const logos = document.querySelectorAll<HTMLImageElement>('.navbar-brand .logo')
      logos.forEach((logo) => { logo.src = '/images/logo-1.png' })
    } else {
      document.documentElement.removeAttribute('data-dark-mode')
      localStorage.setItem('darkMode', 'false')
      const logos = document.querySelectorAll<HTMLImageElement>('.navbar-brand .logo')
      logos.forEach((logo) => { logo.src = '/images/logo-2.png' })
    }
  }

  return (
    <button className="dark-mode-toggle" aria-label="Toggle dark mode" onClick={toggle}>
      <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
    </button>
  )
}
