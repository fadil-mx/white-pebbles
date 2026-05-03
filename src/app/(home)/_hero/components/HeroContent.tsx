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
    <div className='relative z-10 flex-1 flex flex-col px-6 md:px-16 max-w-[1500px] mx-auto w-full pt-32 md:pt-36 pb-16 md:pb-20'>
      {/* ===== TOP ZONE: headline + (description+CTAs) | quote ===== */}
      <div className='flex-1 flex flex-col justify-center'>
        {/* Eyebrow */}
        <div
          className='text-[11px] tracking-[0.4em] uppercase text-gold mb-8 flex items-center gap-4 font-semibold opacity-0'
          style={{
            animation: 'fadeUp 1s 0.3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <span className='w-10 h-px bg-gold' />
          Premium pastry supplies · Dubai, UAE
        </div>

        {/* Massive headline — now spans the full width since the 3D scene is gone */}
        <h1 className='text-display text-cream font-extralight text-[clamp(72px,9vw,180px)] leading-[0.92] tracking-[-0.04em] mb-12 max-w-[1500px]'>
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

        {/* Two-column row: description + CTAs (left) | editorial chef quote (right) */}
        <div
          className='grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-16 items-end opacity-0'
          style={{
            animation: 'fadeUp 1s 1.6s forwards cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* Left: description + CTAs */}
          <div>
            <p className='text-cream/70 text-base md:text-[17px] leading-[1.6] max-w-[560px] mb-10'>
              From Belgium&apos;s finest couverture to Italy&apos;s most exquisite
              moulds — we curate the world&apos;s premium ingredients and tools
              for the UAE&apos;s most ambitious pastry chefs.
            </p>

            <div className='flex flex-wrap gap-6 items-center'>
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

          {/* Right: editorial chef quote */}
          <div className='md:border-l md:border-gold/25 md:pl-10 lg:pl-14'>
            <div className='text-[10px] tracking-[0.35em] uppercase text-gold font-semibold mb-5 flex items-center gap-3'>
              <span>★</span>
              From the Atelier
            </div>
            <p className='text-display italic font-light text-[clamp(20px,2vw,28px)] leading-[1.4] text-cream/90 mb-5'>
              &ldquo;The standard for premium ingredients in the Gulf. Every
              visit, something exceptional.&rdquo;
            </p>
            <div className='text-[10px] tracking-[0.25em] uppercase text-cream/55 font-medium leading-[1.6]'>
              <div>Chef Pascal Tepper</div>
              <div className='text-cream/35 mt-1'>
                Atlantis · The Royal · Dubai
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM HIGHLIGHT ROW: 3 editorial cards ===== */}
      <div
        className='mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-t border-cream/15 pt-10 opacity-0'
        style={{
          animation: 'fadeUp 1s 2.0s forwards cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Atelier of the Week */}
        <div className='md:pr-10 lg:pr-14'>
          <div className='text-[10px] tracking-[0.35em] uppercase text-gold font-semibold mb-3'>
            · Atelier of the Week ·
          </div>
          <h3 className='text-display italic text-[24px] md:text-[28px] font-light text-cream leading-[1.1] mb-4'>
            Valrhona Cuvée
          </h3>
          <p className='text-cream/55 text-sm leading-[1.6] mb-4 max-w-[280px]'>
            A Grand Cru couverture exclusive to our patisserie partners this
            season.
          </p>
          <Link
            href='/category/chocolate-selections'
            className='inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-cream/70 hover:text-gold transition-colors'
          >
            Explore the selection
            <svg
              width='12'
              height='10'
              viewBox='0 0 14 10'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <path
                d='M1 5h12m0 0L9 1m4 4L9 9'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </div>

        {/* Trusted by */}
        <div className='md:px-10 lg:px-14 md:border-l md:border-cream/15'>
          <div className='text-[10px] tracking-[0.35em] uppercase text-gold font-semibold mb-3'>
            · Trusted by ·
          </div>
          <div className='text-display italic text-[18px] md:text-[20px] font-light text-cream leading-[1.5] space-y-1 mb-4'>
            <div>Atlantis · Burj Al Arab</div>
            <div>Four Seasons · Mandarin</div>
            <div className='text-cream/55 text-[15px] not-italic font-normal'>
              + 200 five-star kitchens across the GCC
            </div>
          </div>
        </div>

        {/* Visit Showroom */}
        <div className='md:pl-10 lg:pl-14 md:border-l md:border-cream/15'>
          <div className='text-[10px] tracking-[0.35em] uppercase text-gold font-semibold mb-3'>
            · Visit our showroom ·
          </div>
          <div className='text-display text-[20px] md:text-[22px] font-light text-cream leading-[1.3] mb-2'>
            Al Quoz Industrial 3
          </div>
          <div className='text-[11px] tracking-[0.15em] text-cream/55 font-medium mb-4 leading-[1.7]'>
            Mon — Sat · 09:00 — 21:00
            <br />
            Dubai, United Arab Emirates
          </div>
          <Link
            href='#contact'
            className='inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-cream/70 hover:text-gold transition-colors'
          >
            Book a tasting
            <svg
              width='12'
              height='10'
              viewBox='0 0 14 10'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <path
                d='M1 5h12m0 0L9 1m4 4L9 9'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
