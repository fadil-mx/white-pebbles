import HeroContent from './components/HeroContent'

export default function Hero() {
  return (
    <section className='relative min-h-screen bg-espresso text-cream overflow-hidden flex flex-col'>
      {/* Warm corner glows (replaces the 3D backdrop with atmosphere only) */}
      <div className='absolute -top-40 -right-40 w-[1100px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(212,162,86,0.13),transparent_70%)] pointer-events-none' />
      <div className='absolute -bottom-40 -left-40 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(168,106,38,0.08),transparent_70%)] pointer-events-none' />

      {/* Corner accents */}
      <div className='absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/60 z-20' />
      <div className='absolute top-8 right-8 w-8 h-8 border-t border-r border-gold/60 z-20' />
      <div className='absolute bottom-8 left-8 w-8 h-8 border-b border-l border-gold/60 z-20' />
      <div className='absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold/60 z-20' />

      <HeroContent />
    </section>
  )
}
