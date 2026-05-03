'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-3 left-3 right-3 z-[100] transition-all duration-400 rounded-full ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-xl border border-cocoa/10 shadow-lg py-3 px-6 md:px-10'
          : 'py-5 px-6 md:px-10 mix-blend-difference'
      } grid grid-cols-[1fr_auto_1fr] items-center gap-8`}
    >
      {/* Left: nav links (desktop) */}
      <div
        className={`hidden md:flex gap-9 ${scrolled ? 'text-cocoa' : 'text-cream'}`}
      >
        {[
          { label: 'Shop', href: '#categories' },
          { label: 'Story', href: '#feature' },
          { label: 'Brands', href: '#promises' },
          { label: 'Contact', href: '#cta' },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className='text-xs font-medium tracking-[0.18em] uppercase hover:text-caramel-deep transition-colors'
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Center: logo */}
      <Link
        href='/'
        className={`font-display text-3xl leading-none text-center ${
          scrolled ? 'text-cocoa' : 'text-cream'
        }`}
      >
        White{' '}
        <em className='not-italic font-display italic text-gold'>Pebbles</em>
        <span className='block text-[8px] font-sans tracking-[0.4em] uppercase opacity-70 mt-1 font-medium'>
          Dubai · Est. 2014
        </span>
      </Link>

      {/* Right: CTA */}
      <div className='flex justify-end'>
        <Link
          href='#categories'
          className={`text-xs font-semibold tracking-[0.15em] uppercase px-5 py-2 rounded-full border transition-all ${
            scrolled
              ? 'border-cocoa text-cocoa hover:bg-caramel hover:border-caramel hover:text-cream'
              : 'border-cream text-cream hover:bg-caramel hover:border-caramel'
          }`}
        >
          Browse Catalogue
        </Link>
      </div>
    </nav>
  )
}
