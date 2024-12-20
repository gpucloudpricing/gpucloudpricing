'use client'

import { useEffect, useRef, useState } from 'react'

const Banner = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(0)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = containerRef.current.offsetHeight
        const maxSize = Math.max(width, height)
        setSize(maxSize)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div ref={containerRef} className="relative bg-black text-white py-24 overflow-hidden">
      {/* Gradient mesh background */}
      <div 
        className="absolute left-0 top-0 bg-gradient-to-br from-yellow-400 to-black"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.8,
        }}
      ></div>
      
      {/* Square grid overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{ aspectRatio: '1 / 1' }}>
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-600 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-shadow-sm">
          Comprehensive GPU Cloud Pricing Guide
        </h1>
        <p className="text-xl md:text-2xl text-center text-shadow-sm max-w-3xl mx-auto">
          Up-to-date cost and feature comparisons, all in one place.
        </p>
      </div>
    </div>
  )
}

export default Banner

