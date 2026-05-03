import Link from "next/link";

export default function Feature() {
  return (
    <section
      id="feature"
      className="bg-cocoa-deep text-cream py-40 md:py-52 px-6 md:px-16 overflow-hidden relative"
    >
      <div className="absolute top-1/2 -left-[5%] -translate-y-1/2 text-display italic text-[clamp(180px,25vw,360px)] font-extralight text-gold/[0.06] leading-none pointer-events-none whitespace-nowrap tracking-[-0.05em]">
        savoir-faire
      </div>

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 md:gap-24 items-center relative z-10">
        <div className="reveal aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-cocoa-light to-cocoa-deep relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,162,86,0.4),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.5),transparent_60%)]" />
          <div className="absolute bottom-10 left-10 right-10 text-display italic text-[22px] font-light leading-[1.4] text-cream z-10">
            <span className="block w-8 h-px bg-gold mb-4" />
            Every five-star creation begins with the right foundation. We are that
            foundation.
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: "100ms" }}>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 font-semibold flex items-center gap-3">
            <span className="w-6 h-px bg-gold" />
            Our Philosophy
          </div>
          <h2 className="text-display text-[clamp(48px,5.5vw,84px)] font-extralight leading-[0.95] tracking-[-0.03em] mb-10">
            Crafted for those who refuse to{" "}
            <em className="italic text-gold font-light">compromise.</em>
          </h2>
          <p className="text-cream/75 text-[17px] leading-[1.8] mb-6 max-w-[540px]">
            For over a decade, White Pebbles has supplied the UAE's most discerning
            kitchens — five-star hotels, master pâtissiers, hospitality groups, and
            the home bakers who care just as deeply.
          </p>
          <p className="text-cream/75 text-[17px] leading-[1.8] mb-8 max-w-[540px]">
            We don't just import products. We curate partnerships with the world's
            most respected manufacturers, ensuring every gram of cocoa, every
            silicone mould, every drop of flavouring meets the standard your craft
            demands.
          </p>
          <Link
            href="#"
            className="group bg-caramel text-cream px-9 py-5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-3 hover:bg-cream hover:text-cocoa transition-colors duration-500"
          >
            Read Our Story
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              className="group-hover:translate-x-1 group-hover:-rotate-45 transition-transform duration-400"
            >
              <path
                d="M1 7h14m0 0L9 1m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
