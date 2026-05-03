import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  findCategory,
  generateProducts,
  type Product,
} from "@/lib/categories";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const products = generateProducts(category, 12);
  const [featured, ...rest] = products;

  // 6 related categories (same brand, excluding current and the catch-all)
  const related = CATEGORIES.filter(
    (c) => c.slug !== slug && c.slug !== "all-products"
  ).slice(0, 6);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <div className="grain-overlay" />
      <Navbar />

      <main>
        {/* ===== HERO ===== */}
        <section className="relative bg-espresso text-cream pt-40 pb-24 px-6 md:px-16 overflow-hidden">
          {/* Warm corner glow */}
          <div className="absolute -top-40 -right-40 w-[900px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(212,162,86,0.15),transparent_70%)] pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/40 z-10" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-gold/40 z-10" />

          <div className="relative max-w-[1500px] mx-auto">
            {/* Breadcrumb */}
            <nav className="text-[10px] tracking-[0.4em] uppercase text-cream/45 mb-12 flex items-center gap-3 font-medium">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span className="opacity-40">/</span>
              <Link
                href="/#categories"
                className="hover:text-gold transition-colors"
              >
                The Collection
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-gold">{category.name}</span>
            </nav>

            <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20 items-end">
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-7 font-semibold flex items-center gap-3">
                  <span className="w-6 h-px bg-gold" />
                  Premium Selection · UAE
                </div>
                <h1 className="text-display text-[clamp(56px,9vw,140px)] font-extralight leading-[0.9] tracking-[-0.04em]">
                  {category.name}
                </h1>
                <p className="text-cream/60 text-base md:text-lg mt-9 max-w-[560px] leading-[1.7]">
                  Curated from the world&apos;s most ambitious patisserie
                  houses. Every product in this collection is hand-selected for
                  the discerning UAE pastry chef who demands the exceptional.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-12 gap-y-8 lg:justify-end">
                <Stat value={category.count.toString()} label="Products" />
                <Stat value="8+" label="Brands" />
                <Stat value="6" label="Origins" />
                <Stat value="11Y" label="In the UAE" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== FILTER BAR (sticky) ===== */}
        <section className="sticky top-0 z-30 bg-cream-light/95 backdrop-blur-md border-y border-cocoa/8 px-6 md:px-16">
          <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-5 py-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="text-[10px] tracking-[0.3em] uppercase text-cocoa/60 font-semibold">
                Showing {products.length} of {category.count}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {["All Brands", "Origin", "Price", "Pack Size"].map((f) => (
                  <button
                    key={f}
                    className="text-[10px] tracking-[0.18em] uppercase font-semibold px-4 py-2 border border-cocoa/15 rounded-full hover:border-caramel hover:text-caramel transition-colors"
                  >
                    {f} <span className="ml-1.5 opacity-50">+</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-cocoa/60 font-semibold">
                Sort by
              </span>
              <button className="text-[10px] tracking-[0.2em] uppercase font-bold text-cocoa hover:text-caramel transition-colors flex items-center gap-2">
                Curator&apos;s Pick
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ===== FEATURED + GRID ===== */}
        <section className="bg-cream-light px-6 md:px-16 py-16 md:py-24">
          <div className="max-w-[1500px] mx-auto">
            {featured && <FeaturedProduct product={featured} />}

            <div className="mt-20 mb-10 flex items-end justify-between">
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-caramel-deep mb-3 font-semibold">
                  · The Collection ·
                </div>
                <h2 className="text-display text-[clamp(28px,3.5vw,44px)] font-extralight tracking-[-0.02em]">
                  Browse the catalogue
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-cocoa/50 font-semibold">
                {products.length} of {category.count} shown
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {rest.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {products.length < category.count && (
              <div className="mt-16 text-center">
                <button className="inline-flex items-center gap-3 border border-cocoa/30 text-cocoa px-9 py-5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold hover:bg-cocoa hover:text-cream transition-all">
                  Load more
                  <span className="text-cocoa/50 group-hover:text-cream/50">
                    +{category.count - products.length}
                  </span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ===== RELATED CATEGORIES ===== */}
        <section className="bg-cream px-6 md:px-16 py-20 md:py-28">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-caramel-deep mb-4 font-semibold flex items-center gap-3">
                  <span className="w-6 h-px bg-caramel-deep" />
                  Continue exploring
                </div>
                <h2 className="text-display text-[clamp(36px,4vw,56px)] font-extralight leading-[0.95] tracking-[-0.03em]">
                  Other collections.
                </h2>
              </div>
              <Link
                href="/#categories"
                className="group inline-flex text-[11px] tracking-[0.18em] uppercase font-semibold gap-3 items-center hover:gap-5 transition-all"
              >
                View all 24 collections
                <span className="w-8 h-px bg-current relative">
                  <span className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-current rotate-45" />
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-cocoa-deep block transition-shadow duration-500 hover:shadow-[0_20px_40px_-20px_rgba(13,8,5,0.5)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,162,86,0.18),transparent_65%)] transition-opacity duration-500 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-caramel translate-y-full group-hover:translate-y-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
                  <div className="relative h-full p-5 flex flex-col justify-between z-10">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-medium text-cream/55 group-hover:text-cocoa-deep/75 transition-colors duration-500">
                      {c.count} {c.count === 1 ? "Product" : "Products"}
                    </span>
                    <h3 className="text-display text-[18px] leading-[1.05] tracking-[-0.01em] font-light text-cream group-hover:text-cocoa-deep transition-colors duration-500">
                      {c.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONSULTANT CTA ===== */}
        <section className="bg-cocoa-deep text-cream px-6 md:px-16 py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(212,162,86,0.1),transparent_70%)] pointer-events-none" />
          <div className="relative max-w-[900px] mx-auto text-center">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-7 font-semibold">
              · Need guidance? ·
            </div>
            <h2 className="text-display text-[clamp(36px,5vw,76px)] font-extralight leading-[1.0] tracking-[-0.03em] mb-8">
              Speak with our{" "}
              <em className="italic text-caramel font-light">
                pastry consultant
              </em>
              .
            </h2>
            <p className="text-cream/55 text-base md:text-lg leading-[1.7] max-w-[560px] mx-auto mb-12">
              Sourcing the right ingredient for a competition piece, a hotel
              residency, or your patisserie&apos;s seasonal menu? Our curators
              are ready.
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 bg-cream text-cocoa px-9 py-5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold hover:bg-caramel hover:text-cream transition-colors"
              >
                Book a consultation
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  className="group-hover:translate-x-1 group-hover:-rotate-45 transition-transform duration-300"
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
              <Link
                href="#whatsapp"
                className="inline-flex items-center gap-3 border border-cream/30 text-cream px-9 py-5 rounded-full text-xs tracking-[0.18em] uppercase font-semibold hover:bg-cream/5 hover:border-cream transition-colors"
              >
                WhatsApp our team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

// ===== Sub-components =====

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-display text-[44px] md:text-[52px] font-light text-gold leading-none">
        {value}
      </div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-cream/50 mt-2 font-medium">
        {label}
      </div>
    </div>
  );
}

function FeaturedProduct({ product }: { product: Product }) {
  return (
    <Link
      href="#"
      className="group grid md:grid-cols-2 gap-0 items-stretch bg-cream rounded-3xl overflow-hidden transition-shadow duration-700 hover:shadow-[0_40px_80px_-40px_rgba(13,8,5,0.3)]"
    >
      <div
        className="relative aspect-square md:aspect-auto overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.swatch}, ${product.swatch}cc)`,
        }}
      >
        {/* Decorative radials */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,162,86,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,rgba(244,234,213,0.12),transparent_45%)]" />

        {/* Slow-zoom interaction */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,162,86,0.18),transparent_50%)] scale-100 group-hover:scale-110 transition-transform duration-[1500ms] ease-out" />

        {/* SKU watermark + brand */}
        <div className="absolute top-7 right-7 text-cream/85 text-display italic text-[15px] md:text-[17px]">
          {product.brand}
        </div>
        <div className="absolute bottom-7 left-7 text-cream/35 text-[10px] tracking-[0.3em] uppercase font-semibold">
          {product.sku}
        </div>
        <div className="absolute bottom-7 right-7 text-cream/45 text-[10px] tracking-[0.2em] uppercase font-medium">
          {product.weight}
        </div>
      </div>

      <div className="p-8 md:p-14 flex flex-col justify-between">
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-caramel-deep font-semibold mb-5 flex items-center gap-3">
            <span>★</span>
            Curator&apos;s Pick · {product.highlight ?? "Featured"}
          </div>
          <h2 className="text-display text-[clamp(34px,3.5vw,52px)] font-extralight leading-[0.98] tracking-[-0.02em] mb-7">
            {product.name}
          </h2>
          <div className="flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-cocoa/55 mb-9 font-medium flex-wrap">
            <span>{product.brand}</span>
            <span className="w-1 h-1 bg-caramel rounded-full" />
            <span>{product.origin}</span>
            <span className="w-1 h-1 bg-caramel rounded-full" />
            <span>{product.weight}</span>
          </div>
          <p className="text-cocoa/70 text-base leading-[1.75] mb-10 max-w-[460px]">
            {product.description}
          </p>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-cocoa/50 mb-2 font-semibold">
              From
            </div>
            <div className="text-display text-[44px] font-light leading-none">
              <span className="text-caramel-deep text-[18px] tracking-[0.1em] mr-2 align-middle">
                AED
              </span>
              {product.price}
            </div>
          </div>
          <span className="inline-flex items-center gap-3 bg-cocoa text-cream px-7 py-4 rounded-full text-xs tracking-[0.18em] uppercase font-semibold group-hover:bg-caramel transition-colors">
            View Details
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M1 6h12m0 0L8 1m5 5l-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href="#" className="group block">
      <div
        className="relative aspect-square overflow-hidden rounded-2xl mb-5"
        style={{
          background: `linear-gradient(135deg, ${product.swatch}, ${product.swatch}cc)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,162,86,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,rgba(244,234,213,0.1),transparent_45%)]" />

        {/* Hover glow sweep */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Highlight chip */}
        {product.highlight && (
          <div className="absolute top-4 left-4 bg-cream text-cocoa text-[8px] tracking-[0.22em] uppercase font-bold px-3 py-1.5 rounded-full">
            {product.highlight}
          </div>
        )}

        {/* Hover-revealed view button */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-cocoa"
          >
            <path
              d="M7 17L17 7M9 7h8v8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="absolute bottom-5 left-5 text-cream/75 text-display italic text-[13px]">
          {product.brand}
        </div>
        <div className="absolute bottom-5 right-5 text-cream/40 text-[8px] tracking-[0.2em] uppercase font-semibold">
          {product.weight}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-cocoa/45 font-semibold mb-2">
          <span>{product.origin}</span>
          <span className="w-1 h-1 bg-caramel rounded-full" />
          <span>{product.sku}</span>
        </div>
        <h3 className="text-display text-[18px] font-light leading-[1.18] tracking-[-0.01em] mb-3 group-hover:text-caramel-deep transition-colors duration-500 line-clamp-2 min-h-[44px]">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] tracking-[0.25em] uppercase text-caramel-deep font-semibold mr-1.5">
              AED
            </span>
            <span className="text-display text-[22px] font-light">
              {product.price}
            </span>
          </div>
          <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-cocoa/40 group-hover:text-cocoa transition-colors flex items-center gap-1.5">
            Details
            <svg
              width="12"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M1 5h12m0 0L9 1m4 4L9 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
