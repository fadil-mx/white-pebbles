'use client'
import Link from 'next/link'

type Props = {
  name: string
  count: number
  slug: string
}

export default function CategoryCard({ name, count, slug }: Props) {
  return (
    <Link
      href={`/category/${slug}`}
      className='group relative aspect-square rounded-2xl overflow-hidden bg-cocoa-deep block transition-shadow duration-500 hover:shadow-[0_20px_40px_-20px_rgba(13,8,5,0.5)]'
    >
      {/* Idle radial accent */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,162,86,0.18),transparent_65%)] transition-opacity duration-500 group-hover:opacity-0' />

      {/* Caramel wipe — slides up on hover */}
      <div className='absolute inset-0 bg-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)]' />

      {/* Content */}
      <div className='relative h-full p-5 flex flex-col justify-between z-10'>
        <div className='flex items-start justify-between'>
          <span className='text-[9px] tracking-[0.3em] uppercase font-medium text-cream/55 group-hover:text-cocoa-deep/75 transition-colors duration-500'>
            {count} {count === 1 ? 'Product' : 'Products'}
          </span>
          <span className='w-7 h-7 rounded-full border border-cream/25 flex items-center justify-center text-cream/70 group-hover:border-cocoa-deep/30 group-hover:text-cocoa-deep group-hover:bg-cream transition-all duration-500'>
            <svg
              width='10'
              height='10'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='transition-transform duration-500 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]'
            >
              <path d='M7 17L17 7M9 7h8v8' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </span>
        </div>

        <h3 className='text-display text-[18px] leading-[1.05] tracking-[-0.01em] font-light text-cream group-hover:text-cocoa-deep transition-colors duration-500'>
          {name}
        </h3>
      </div>
    </Link>
  )
}
