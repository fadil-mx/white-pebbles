import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="bg-cream px-6 md:px-16 pb-32 md:pb-40">
      <div className="reveal max-w-[1500px] mx-auto bg-espresso rounded-3xl px-8 md:px-20 py-24 md:py-32 relative overflow-hidden text-cream text-center">
        <div className="absolute -top-1/2 -left-[10%] w-3/5 h-[200%] bg-[radial-gradient(ellipse,rgba(212,162,86,0.15),transparent_60%)] animate-float-slow" />
        <div className="absolute -bottom-1/2 -right-[10%] w-3/5 h-[200%] bg-[radial-gradient(ellipse,rgba(217,119,87,0.12),transparent_60%)] animate-float-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />

        <div className="relative z-10">
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 font-semibold flex items-center gap-3 justify-center">
            <span className="w-6 h-px bg-gold" />
            Get Started
          </div>
          <h2 className="text-display text-[clamp(48px,6vw,96px)] font-extralight leading-none tracking-[-0.03em] mb-8">
            Let's create something{" "}
            <em className="italic text-caramel font-light">extraordinary.</em>
          </h2>
          <p className="text-cream/70 text-lg max-w-[600px] mx-auto mb-12 leading-[1.6]">
            Whether you're stocking a five-star kitchen or perfecting a passion at
            home — we'd love to help.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <a
              href="https://wa.me/971547461054"
              className="group bg-caramel text-cream px-9 py-5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-3 hover:bg-cream hover:text-cocoa transition-colors duration-500"
            >
              Chat on WhatsApp
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
            </a>
            <Link
              href="#categories"
              className="text-cream border border-cream/30 px-9 py-5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-3 hover:border-caramel hover:text-caramel transition-colors"
            >
              Browse Catalogue
              <span className="relative w-8 h-px bg-current">
                <span className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-current rotate-45" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
