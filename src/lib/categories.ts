export type Category = {
  name: string;
  slug: string;
  count: number;
};

// Shared catalogue of categories — used by the home grid and category detail pages.
export const CATEGORIES: Category[] = [
  { name: "All Products", slug: "all-products", count: 170 },
  { name: "Accessories", slug: "accessories", count: 12 },
  { name: "Cake Bases", slug: "cake-bases", count: 6 },
  { name: "Cake Mixes", slug: "cake-mixes", count: 6 },
  { name: "Chocolate Color Powders", slug: "chocolate-color-powders", count: 3 },
  { name: "Chocolate Decorations", slug: "chocolate-decorations", count: 1 },
  { name: "Chocolate Selections", slug: "chocolate-selections", count: 10 },
  { name: "Cold Glazes", slug: "cold-glazes", count: 1 },
  { name: "Colors & Spray Machines", slug: "colors-and-spray-machines", count: 8 },
  { name: "Cups & Skewers", slug: "cups-and-skewers", count: 8 },
  { name: "Desserts Love", slug: "desserts-love", count: 3 },
  { name: "Flavourings", slug: "flavourings", count: 12 },
  { name: "Flowers", slug: "flowers", count: 5 },
  { name: "Gel Colors", slug: "gel-colors", count: 30 },
  { name: "Glitters", slug: "glitters", count: 3 },
  { name: "Pastry Utensils", slug: "pastry-utensils", count: 15 },
  { name: "Plastic Wrappers", slug: "plastic-wrappers", count: 8 },
  { name: "Powder Foams", slug: "powder-foams", count: 5 },
  { name: "Printer & Accessories", slug: "printer-and-accessories", count: 6 },
  { name: "Silicone Moulds", slug: "silicone-moulds", count: 5 },
  { name: "Sprays", slug: "sprays", count: 5 },
  { name: "Springles & Confetti", slug: "springles-and-confetti", count: 2 },
  { name: "Sugar Beads", slug: "sugar-beads", count: 1 },
  { name: "Sugar Paste", slug: "sugar-paste", count: 2 },
];

export function findCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

// ===== Dummy product generator =====
// Deterministic — same category always produces same products on every render
// (uses category slug length as seed, so SSR/CSR match).

export type Product = {
  id: string;
  name: string;
  brand: string;
  origin: string;
  weight: string;
  price: number;
  sku: string;
  swatch: string; // hex color used as the product card "image" backdrop
  highlight?: "Bestseller" | "New" | "Limited" | "Curator's Pick";
  description: string;
};

const BRANDS = [
  "Callebaut",
  "Valrhona",
  "Cacao Barry",
  "Felchlin",
  "Belcolade",
  "Sicoly",
  "Boiron",
  "Pavoni",
  "Silikomart",
  "Modecor",
];

const ORIGINS = [
  "Belgium",
  "France",
  "Italy",
  "Switzerland",
  "Spain",
  "United Kingdom",
];

const ADJECTIVES = [
  "Atelier",
  "Reserve",
  "Signature",
  "Heritage",
  "Royal",
  "Master",
  "Artisan",
  "Premium",
  "Grand Cru",
  "Maison",
];

const SUFFIXES = [
  "Selection",
  "Edition",
  "Collection",
  "Series",
  "Range",
  "Cuvée",
];

const WEIGHTS = ["250g", "500g", "1kg", "2.5kg", "5kg", "Set", "Box of 12"];

// Brand-palette swatches; the gradient on the product card mixes these
const SWATCHES = [
  "#1f1408",
  "#3d2817",
  "#6b4423",
  "#a86a26",
  "#c8893d",
  "#d4a256",
  "#ebcfc0",
  "#a8804a",
];

const HIGHLIGHTS: Product["highlight"][] = [
  "Bestseller",
  "Curator's Pick",
  "New",
  "Limited",
];

export function generateProducts(category: Category, count = 12): Product[] {
  const seed = category.slug.length + category.name.length;
  const products: Product[] = [];
  const total = Math.min(count, 12);

  for (let i = 0; i < total; i++) {
    const brand = BRANDS[(i * 3 + seed) % BRANDS.length];
    const origin = ORIGINS[(i * 2 + seed) % ORIGINS.length];
    const adj = ADJECTIVES[(i + seed) % ADJECTIVES.length];
    const suf = SUFFIXES[(i * 5 + seed) % SUFFIXES.length];
    const swatch = SWATCHES[(i + seed * 2) % SWATCHES.length];
    const weight = WEIGHTS[(i + seed) % WEIGHTS.length];
    const price = 45 + ((i * 37 + seed * 13) % 380);
    const highlight =
      i < HIGHLIGHTS.length && i % 3 === 0 ? HIGHLIGHTS[i % HIGHLIGHTS.length] : undefined;

    products.push({
      id: `${category.slug}-${i + 1}`,
      name: `${adj} ${category.name} ${suf}`,
      brand,
      origin,
      weight,
      price,
      sku: `WP-${category.slug.toUpperCase().replace(/-/g, "").slice(0, 3)}-${(1000 + i + seed)
        .toString()
        .slice(-3)}`,
      swatch,
      highlight,
      description: `Sourced from ${brand}'s ${origin} atelier — a ${adj.toLowerCase()} ${suf.toLowerCase()} chosen for the discerning UAE pâtissier. Trusted in five-star kitchens, hotel residencies, and competition pieces across the Gulf.`,
    });
  }

  return products;
}
