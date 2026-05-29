'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number      // ms
  y?: number          // px translation
  style?: CSSProperties
  className?: string
}

export default function RevealOnScroll({
  children,
  delay = 0,
  y = 32,
  style,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = `translateY(${y}px)`
    el.style.transition = `opacity 0ms, transform 0ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setTimeout(() => {
          el.style.transition = `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, 40)
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, y])

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  )
}
