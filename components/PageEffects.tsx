'use client'

import { useEffect } from 'react'

export default function PageEffects() {
  useEffect(() => {
    // Hide preloader
    const loader = document.getElementById('gen-loading')
    if (loader) {
      loader.style.transition = 'opacity 0.6s ease'
      loader.style.opacity = '0'
      setTimeout(() => {
        loader.style.display = 'none'
      }, 600)
    }

    // Hide back-to-top initially
    const backToTop = document.getElementById('back-to-top')
    if (backToTop) backToTop.style.display = 'none'

    // Sticky header + back-to-top on scroll
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
