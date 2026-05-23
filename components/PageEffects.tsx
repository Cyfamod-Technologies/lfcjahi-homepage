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
    if (backToTop) backToTop.style.display = 'none'

    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const header = document.querySelector('header')

        if (header) {
          if (scrollTop > 300) {
            header.classList.add('gen-header-sticky', 'animated', 'fadeInDown', 'animate__faster')
          } else {
            header.classList.remove('gen-header-sticky', 'animated', 'fadeInDown', 'animate__faster')
          }
        }

        if (backToTop) {
          backToTop.style.display = scrollTop > 250 ? 'block' : 'none'
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
