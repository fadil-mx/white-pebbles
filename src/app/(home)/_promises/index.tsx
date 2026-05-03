const PROMISES = [
  {
    num: "01",
    title: "Free UAE Delivery",
    body: "From Dubai to Fujairah — every order delivered to your kitchen, complimentary, no minimum.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "International Brands",
    body: "Direct partnerships with 30+ of Europe's most respected pastry and bakery manufacturers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Stringent Quality",
    body: "Every product passes our quality protocols. The same standards demanded by the chefs we serve.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

export default function Promises() {
  return (
    <section id="promises" className="bg-cream py-32 md:py-40 px-6 md:px-16">
      <div className="max-w-[1500px] mx-auto">
        <div className="reveal mb-20">
          <div className="text-[10px] tracking-[0.4em] uppercase text-caramel-deep mb-6 font-semibold flex items-center gap-3">
            <span className="w-6 h-px bg-caramel-deep" />
            The Promise
          </div>
          <h2 className="text-display text-[clamp(48px,6vw,88px)] font-extralight leading-[0.95] tracking-[-0.03em]">
            Service that <em className="italic text-caramel font-light">respects</em>
            <br />
            your craft.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMISES.map((p, i) => (
            <div
              key={i}
              className="reveal group p-12 bg-cream border border-cocoa/10 rounded-3xl transition-all duration-500 hover:bg-cocoa hover:text-cream hover:-translate-y-2 cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-display italic text-sm text-caramel-deep mb-8 group-hover:text-gold transition-colors">
                — {p.num}
              </div>
              <div className="w-16 h-16 border border-cocoa rounded-full flex items-center justify-center mb-8 group-hover:border-gold group-hover:text-gold transition-colors">
                {p.icon}
              </div>
              <h3 className="text-display text-[32px] font-light leading-[1.1] tracking-tight mb-4">
                {p.title}
              </h3>
              <p className="text-[15px] leading-[1.7] opacity-75">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
