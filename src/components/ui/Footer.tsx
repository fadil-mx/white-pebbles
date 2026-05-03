import Link from "next/link";

const FB = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const IG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const WA = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-1 1.1c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.2-.2-.5-.3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream pt-24 px-6 md:px-12 pb-10">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 md:gap-20 pb-16 border-b border-cream/15">
          <div>
            <div className="font-display text-5xl font-light leading-none tracking-tight mb-6">
              White<br />
              <em className="italic text-caramel">Pebbles</em>
            </div>
            <p className="text-cream/65 text-[15px] leading-[1.7] max-w-[380px] mb-8">
              Dubai's trusted source for premium bakery ingredients, pastry tools,
              and cake decorations since 2014.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FB />, href: "https://www.facebook.com/whitepebblesuae", label: "Facebook" },
                { icon: <IG />, href: "https://www.instagram.com/whitepebblesuae", label: "Instagram" },
                { icon: <WA />, href: "https://wa.me/971547461054", label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-11 h-11 border border-cream/15 rounded-full flex items-center justify-center hover:bg-caramel hover:border-caramel hover:-translate-y-1 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Shop", links: ["All Products", "Categories", "Brands", "New Arrivals"] },
            { title: "Company", links: ["About Us", "Our Mission", "Quality", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.3em] uppercase text-gold mb-7 font-semibold">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-cream/70 text-sm hover:text-caramel hover:pl-1 transition-all inline-block"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-gold mb-7 font-semibold">
              Reach Us
            </h4>
            <p className="text-cream/70 text-sm leading-[1.7] mb-4">
              Office #6, Aswaaq Warehouse Compound, 24 B St, Al Qusais Industrial
              Area 5, Dubai, UAE
            </p>
            <a
              href="tel:+97142949111"
              className="block text-cream/70 text-sm hover:text-caramel transition-colors"
            >
              +971 4 294 9111
            </a>
            <a
              href="mailto:info@whitepebbles.ae"
              className="block text-cream/70 text-sm hover:text-caramel transition-colors mt-2"
            >
              info@whitepebbles.ae
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-5">
          <p className="text-xs text-cream/50 tracking-wider">
            © 2026 White Pebbles General Trading LLC · All rights reserved
          </p>
          <p className="text-xs text-cream/50 tracking-wider">
            Designed with care · Dubai
          </p>
        </div>
      </div>
    </footer>
  );
}
