'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Cpu } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md z-50 relative border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Cpu className="w-8 h-8 text-blue-600" />
          <span className="font-bold text-xl">GPU Cloud Pricing</span>
        </Link>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          {/* Mobile menu items can be added here if needed in the future */}
        </div>
      )}
    </header>
  )
}

export default Header

