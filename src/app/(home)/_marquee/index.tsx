const BRANDS = [
  { name: "Barry Callebaut", italic: false },
  { name: "Silikomart", italic: true },
  { name: "KitchenAid", italic: false },
  { name: "IRCA", italic: true },
  { name: "Belcolade", italic: false },
  { name: "Martellato", italic: true },
  { name: "Patisfrance", italic: false },
  { name: "Florensuc", italic: true },
  { name: "Matfer", italic: false },
  { name: "Texturas", italic: true },
];

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="bg-cocoa-deep text-cream py-6 overflow-hidden border-y border-cream/15">
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        {items.map((brand, i) => (
          <span
            key={i}
            className={`text-display text-[28px] font-light tracking-tight flex items-center gap-16 ${
              brand.italic ? "italic text-caramel" : ""
            }`}
          >
            {brand.name}
            <span className="text-gold text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
