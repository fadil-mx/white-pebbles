'use client'
import dynamic from 'next/dynamic'
import HeroContent from './components/HeroContent'

// Lazy-load Three.js so initial bundle stays small
// ssr: false because Three.js needs a browser/WebGL context
const PatisserieCake = dynamic(
  () => import('@/components/3d/PatisserieCake'),
  {
    ssr: false,
    loading: () => <div className='absolute inset-0 bg-espresso' />,
  }
)

export default function Hero() {
  return (
    <section className='relative h-screen min-h-[760px] bg-espresso text-cream overflow-hidden'>
      <PatisserieCake />

      {/* Corner accents */}
      <div className='absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/60 z-20' />
      <div className='absolute top-8 right-8 w-8 h-8 border-t border-r border-gold/60 z-20' />
      <div className='absolute bottom-8 left-8 w-8 h-8 border-b border-l border-gold/60 z-20' />
      <div className='absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold/60 z-20' />

      <HeroContent />

      {/* Stats meta in corner */}
      <div className='hidden md:block absolute bottom-20 right-16 z-20 text-right text-[10px] tracking-[0.3em] uppercase text-cream/50 leading-[1.8] font-medium'>
        <div>
          10,000+ <span className='text-gold'>Products Curated</span>
        </div>
        <div>
          30+ <span className='text-gold'>Global Brands</span>
        </div>
        <div>
          11 Years <span className='text-gold'>In the UAE</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className='absolute bottom-10 left-1/2 -translate-x-1/2 text-cream text-[10px] tracking-[0.4em] uppercase z-20 opacity-60 flex flex-col items-center gap-3 font-medium'>
        Scroll
        <span className='w-px h-10 bg-gradient-to-b from-cream to-transparent animate-scroll-cue' />
      </div>
    </section>
  )
}
