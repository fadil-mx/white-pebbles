import CategoryCard from "./components/CategoryCard";
import { CATEGORIES } from "@/lib/categories";

export default function Categories() {
  return (
    <section id="categories" className="bg-cream py-32 md:py-40 px-6 md:px-16">
      <div className="max-w-[1500px] mx-auto mb-16 flex flex-wrap justify-between items-end gap-10">
        <div className="reveal max-w-[700px]">
          <div className="text-[10px] tracking-[0.4em] uppercase text-caramel-deep mb-6 font-semibold flex items-center gap-3">
            <span className="w-6 h-px bg-caramel-deep" />
            The Collection
          </div>
          <h2 className="text-display text-[clamp(48px,6vw,88px)] font-extralight leading-[0.95] tracking-[-0.03em]">
            Everything a{" "}
            <em className="italic text-caramel font-light">pastry chef</em>
            <br />
            could possibly need.
          </h2>
          <p className="text-cocoa/70 text-base mt-6 max-w-[480px] leading-[1.7]">
            From the foundations of fine confectionery to the finishing touches
            that make a creation unforgettable — explore our curated categories.
          </p>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.slug}
            name={cat.name}
            count={cat.count}
            slug={cat.slug}
          />
        ))}
      </div>
    </section>
  );
}
