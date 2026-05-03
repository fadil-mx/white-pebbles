import Link from 'next/link'

export default function HeroContent() {
  const headline1 = ['The', 'art', 'of']
  const headline2 = ['begins', 'here.']

  // Each "word slot" is overflow-hidden with extra bottom padding so descenders (g, y, p) aren't clipped.
  // The inner span has matching negative margin to keep visual baseline correct.
  const wordSlot =
    'inline-block overflow-hidden align-top mr-[0.2em] pb-[0.18em] -mb-[0.18em]'
  const wordInner = 'inline-block translate-y-full'

  return (
    <div className='relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-[1500px] mx-auto pointer-events-none'>
      <div
        className='text-[11px] tracking-[0.4em] uppercase text-gold mb-8 flex items-center gap-4 font-semibold opacity-0 pointer-events-auto'
        style={{
          animation: 'fadeUp 1s 0.3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <span className='w-10 h-px bg-gold' />
        Premium pastry supplies · Dubai, UAE
      </div>

      <h1 className='text-display text-cream font-extralight text-[clamp(64px,6vw,104px)] leading-[0.92] tracking-[-0.04em] mb-10 max-w-[1100px] pointer-events-auto'>
        {headline1.map((w, i) => (
          <span key={i} className={wordSlot}>
            <span
              className={wordInner}
              style={{
                animation: `rise 1.2s ${0.5 + i * 0.1}s forwards cubic-bezier(0.2, 0.8, 0.2, 1)`,
              }}
            >
              {w}
            </span>
          </span>
        ))}
        <span className={wordSlot}>
          <span
            className={`${wordInner} italic font-light text-caramel`}
            style={{
              animation: `rise 1.2s 0.8s forwards cubic-bezier(0.2, 0.8, 0.2, 1)`,
            }}
          >
            pastry
          </span>
        </span>
        <br />
        {headline2.map((w, i) => (
          <span key={i} className={wordSlot}>
            <span
              className={wordInner}
              style={{
                animation: `rise 1.2s ${1.0 + i * 0.1}s forwards cubic-bezier(0.2, 0.8, 0.2, 1)`,
              }}
            >
              {w}
            </span>
          </span>
        ))}
      </h1>

      <p
        className='text-cream/70 text-base md:text-[17px] leading-[1.6] max-w-[480px] mb-12 opacity-0 pointer-events-auto'
        style={{
          animation: 'fadeUp 1s 1.6s forwards cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        From Belgium&apos;s finest couverture to Italy&apos;s most exquisite
        moulds we curate the world&apos;s premium ingredients and tools for the
        UAE&apos;s most ambitious pastry chefs.
      </p>

      <div
        className='flex flex-wrap gap-6 items-center opacity-0 pointer-events-auto'
        style={{
          animation: 'fadeUp 1s 1.8s forwards cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <Link
          href='#categories'
          className='group bg-cream text-cocoa px-9 py-5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-3 hover:bg-caramel hover:text-cream transition-colors duration-500 relative overflow-hidden'
        >
          <span className='relative z-10'>Explore Catalogue</span>
          <svg
            width='16'
            height='14'
            viewBox='0 0 16 14'
            fill='none'
            className='relative z-10 group-hover:translate-x-1 group-hover:-rotate-45 transition-transform duration-300'
          >
            <path
              d='M1 7h14m0 0L9 1m6 6l-6 6'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>
        <Link
          href='#feature'
          className='group text-cream text-xs tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-3 hover:text-caramel hover:gap-5 transition-all'
        >
          Our Story
          <span className='relative w-8 h-px bg-current'>
            <span className='absolute right-0 -top-1 w-2 h-2 border-t border-r border-current rotate-45' />
          </span>
        </Link>
      </div>
    </div>
  )
}
