'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageEffects() {
  const pathname = usePathname()

  // Re-run every time the route changes (client-side navigation re-shows the
  // preloader div from the new page component, so we must hide it again).
  useEffect(() => {
    const loader = document.getElementById('gen-loading')
    if (loader) {
      loader.style.display = 'block'
      loader.style.opacity = '1'
      loader.style.transition = 'opacity 0.5s ease'
      // Small delay so the new page content renders first
      const t = setTimeout(() => {
        loader.style.opacity = '0'
        setTimeout(() => { loader.style.display = 'none' }, 500)
      }, 50)
      return () => clearTimeout(t)
    }
  }, [pathname])

  // Scroll effects — scroll listener lives for the whole session
  useEffect(() => {
    const backToTop = document.getElementById('back-to-top')
    const header = document.querySelector('header')
    const body = document.body
    if (backToTop) backToTop.style.display = 'none'

    let ticking = false
    let stickyActive = false
    const stickyEnter = 300
    const stickyExit = 220

    function syncStickyState(shouldStick: boolean) {
      if (!header || shouldStick === stickyActive) return

      stickyActive = shouldStick
      header.classList.toggle('gen-header-sticky', shouldStick)

      if (shouldStick) {
        body.style.paddingTop = `${header.getBoundingClientRect().height}px`
      } else {
        body.style.paddingTop = ''
      }
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop

        if (header) {
          const shouldStick = stickyActive ? scrollTop > stickyExit : scrollTop > stickyEnter
          syncStickyState(shouldStick)
        }

        if (backToTop) {
          backToTop.style.display = scrollTop > 250 ? 'block' : 'none'
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      body.style.paddingTop = ''
    }
  }, [])

  return null
}
