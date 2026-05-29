'use client'

import { useEffect } from 'react'

export default function ScrollRevealInit() {
  useEffect(() => {
    const selector = '[data-sr]'
    const els = document.querySelectorAll<HTMLElement>(selector)

    els.forEach(el => {
      const delay = Number(el.dataset.srDelay ?? 0)
      const y     = Number(el.dataset.srY     ?? 36)
      el.style.opacity   = '0'
      el.style.transform = `translateY(${y}px)`
      el.style.transition = 'none'
      el.style.willChange = 'opacity, transform'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el    = entry.target as HTMLElement
          const delay = Number(el.dataset.srDelay ?? 0)
          observer.unobserve(el)
          setTimeout(() => {
            el.style.transition = `opacity 750ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 750ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`
            el.style.opacity    = '1'
            el.style.transform  = 'translateY(0)'
          }, 30)
        })
      },
      { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
