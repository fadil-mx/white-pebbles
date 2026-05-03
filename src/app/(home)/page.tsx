import Hero from './_hero'
import Marquee from './_marquee'
import Stats from './_stats'
import Categories from './_categories'
import Feature from './_feature'
import Promises from './_promises'
import CTA from './_cta'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/ui/SmoothScroll'
import RevealObserver from '@/components/ui/RevealObserver'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <RevealObserver />
      <CustomCursor />
      <div className='grain-overlay' />

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Categories />
        <Feature />
        <Promises />
        <CTA />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
