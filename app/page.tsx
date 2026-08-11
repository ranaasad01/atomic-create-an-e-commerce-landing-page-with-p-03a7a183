"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingCart, Heart, ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, scaleIn } from "@/lib/motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BRAND: any = { name: "Asad", email: "support@asadstore.com" };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FEATURED_PRODUCTS: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NEW_ARRIVALS: any[] = [];
const CATEGORIES: string[] = ["All Products", "Electronics", "Fashion", "Home", "Beauty"];
type Category = string;

// ─── Inline brand / data ────────────────────────────────────────────────────

const TRUST_STATS = [
  { value: "120K+", label: "Happy Customers" },
  { value: "4.8★", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Product Categories" },
];

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On all orders over $35. Fast delivery to your door in 2-5 business days.",
  },
  {
    icon: ShieldCheck,
    title: "Buyer Protection",
    desc: "Every purchase is covered. Shop with confidence, always.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Changed your mind? Return anything within 30 days, no questions asked.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our team is always here to help. Chat, email, or call anytime.",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sarah M.",
    location: "New York, USA",
    rating: 5,
    text: "Asad Store has become my go-to for everything. The earbuds I ordered arrived in two days and the quality is incredible for the price.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah%20M.",
    product: "ProSound X3 Earbuds",
  },
  {
    id: "t2",
    name: "James K.",
    location: "London, UK",
    rating: 5,
    text: "Ordered the desk lamp and organiser together. Both are exactly as described. Packaging was perfect and delivery was super fast.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James%20K.",
    product: "ArcLight LED Desk Lamp",
  },
  {
    id: "t3",
    name: "Priya R.",
    location: "Toronto, Canada",
    rating: 5,
    text: "The skincare cream is genuinely amazing. My skin feels so much better after just two weeks. Will definitely be ordering again.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20R.",
    product: "NovaSkin Face Cream",
  },
];

const BADGE_COLORS: Record<string, string> = {
  "Hot Deal": "bg-red-500 text-white",
  Sale: "bg-orange-500 text-white",
  "Best Seller": "bg-amber-500 text-white",
  "Top Rated": "bg-blue-600 text-white",
  "Editor's Pick": "bg-purple-600 text-white",
  New: "bg-emerald-500 text-white",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-[var(--muted-foreground)]">
        ({count.toLocaleString("en-US")})
      </span>
    </div>
  );
}

function ProductCard({
  product,
  index,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  index: number;
}) {
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const priceDisplay = product.price != null ? "$" + (product.price as number).toFixed(2) : "";
  const origPriceDisplay =
    product.originalPrice != null ? "$" + (product.originalPrice as number).toFixed(2) : "";

  return (
    <Reveal delay={index * 0.07}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="group relative flex flex-col rounded-2xl border border-black/5 bg-[var(--card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span
              className={
                "absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide " +
                (BADGE_COLORS[product.badge] ?? "bg-gray-700 text-white")
              }
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="absolute right-3 top-3 rounded-full bg-black/80 px-2 py-0.5 text-[11px] font-bold text-white">
              -{discount}%
            </span>
          )}
          {/* FIX line 168: added text-[var(--background)] so icon is visible on bg-white/90 */}
          <button
            aria-label="Add to wishlist"
            className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--background)] shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
          >
            <Heart size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold leading-snug text-[var(--foreground)] line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />

          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[var(--foreground)]">
                {priceDisplay}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[var(--muted-foreground)] line-through">
                  {origPriceDisplay}
                </span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.93 }}
              className="flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
            >
              <ShoppingCart size={12} />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All Products");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Products") return FEATURED_PRODUCTS;
    return FEATURED_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const heroImageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, x: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
    },
  };

  return (
    <main className="flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--background)] pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px]"
        />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left copy */}
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                <Sparkles size={12} />
                New Season Deals
              </span>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl text-balance">
                {BRAND.name} Store.{" "}
                <span className="text-[var(--accent)]">Everything</span> You
                Need.
              </h1>
              <p className="max-w-md text-base leading-relaxed text-[var(--muted-foreground)] text-pretty">
                From the latest gadgets to everyday essentials, Asad brings you
                top-quality products at prices that make sense. Free shipping on
                orders over $35.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#featured-products"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all duration-300 hover:opacity-90 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Shop Now
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="#new-arrivals"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  New Arrivals
                </Link>
              </div>

              {/* Mini stats */}
              <div className="mt-2 flex flex-wrap gap-6">
                {TRUST_STATS.slice(0, 3).map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-xl font-extrabold text-[var(--foreground)]">
                      {s.value}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right image collage */}
            <motion.div
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                    <img
                      src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/3e9932212bbe4101830e8a221fd4c614.jpg"
                      alt="ProSound X3 Wireless Earbuds"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                    <img
                      src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/10cce7ffe9bd4d8b9ebf20db0c188a30.png"
                      alt="UrbanStep Sneakers"
                      className="h-36 w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 pt-8">
                  <div className="overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                    <img
                      src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8dd6d3ec7c0b45cea0f1017a9a61528b.webp"
                      alt="ArcLight LED Desk Lamp"
                      className="h-36 w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                    <img
                      src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2dd06127f1904b2bb2ab01c4589a971c.jpg"
                      alt="NovaSkin Face Cream"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  <Zap size={16} className="text-[var(--accent)]" />
                  <div>
                    <p className="text-[11px] font-bold text-[var(--background)]">
                      Flash Deals Live
                    </p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">
                      Up to 60% off today
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-y border-black/5 bg-[var(--card)] py-12">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              {VALUE_PROPS.map((vp) => (
                <motion.div
                  key={vp.title}
                  variants={scaleIn}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
                    <vp.icon size={22} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--foreground)]">
                      {vp.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      {vp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── PROMO BANNER ─────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="promo-banner"
          className="bg-[var(--accent)] py-10"
        >
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-foreground)]/70">
                  Limited Time Offer
                </p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--accent-foreground)]">
                  Up to 60% off on top picks. Today only.
                </h2>
              </div>
              <Link
                href="#featured-products"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--accent-foreground)] px-6 py-3 text-sm font-bold text-[var(--accent)] transition-opacity hover:opacity-90"
              >
                Grab the Deal
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section
        id="featured-products"
        className="bg-[var(--background)] py-20 md:py-28"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                  Best Sellers
                </p>
                <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                  Featured Products
                </h2>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  Hand-picked favourites loved by thousands of customers.
                </p>
              </div>
              <Link
                href="#new-arrivals"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          {/* Category filters */}
          <Reveal>
            <div
              id="category-filters"
              className="mb-8 flex gap-2 overflow-x-auto pb-1"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 " +
                    (activeCategory === cat
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                      : "border-black/10 bg-[var(--card)] text-[var(--muted-foreground)] hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]")
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-lg font-semibold text-[var(--foreground)]">
                No products in this category yet.
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Check back soon or browse another category.
              </p>
              <button
                onClick={() => setActiveCategory("All Products")}
                className="mt-2 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent-foreground)]"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────────────────── */}
      <section
        id="new-arrivals"
        className="bg-[var(--card)] py-20 md:py-28"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                Just Landed
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                New Arrivals
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Fresh additions to the Asad collection. Be the first to own them.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {NEW_ARRIVALS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / TESTIMONIALS ──────────────────────────────────── */}
      <section className="bg-[var(--background)] py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                Real Reviews
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-4xl">
                What Our Customers Say
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted-foreground)]">
                Over 120,000 happy shoppers trust Asad for quality, value, and
                fast delivery.
              </p>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star
                        key={si}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--foreground)]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--accent)]/20"
                    />
                    <div>
                      <p className="text-sm font-bold text-[var(--foreground)]">
                        {t.name}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {t.location}
                      </p>
                    </div>
                    <span className="ml-auto rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    Purchased: {t.product}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </motion.div>

          {/* Trust stats row */}
          <Reveal>
            <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-black/5 bg-[var(--card)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] sm:grid-cols-4">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-2xl font-extrabold text-[var(--foreground)]">
                    {s.value}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      {/* FIX line 619/641: was bg-[var(--foreground)] (#f5f5f5 = near-white) with text-white — invisible.
          Changed to bg-[var(--card)] (#16213e = dark navy) so white text is fully visible. */}
      <Reveal>
        <section className="bg-[var(--card)] py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Start Shopping
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl text-balance">
              Ready to find your next favourite thing?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Join over 120,000 happy customers. Free shipping on orders over
              $35, easy returns, and 24/7 support.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="#featured-products"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-bold text-[var(--accent-foreground)] shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all hover:opacity-90"
              >
                Browse All Products
                <ArrowRight size={15} />
              </Link>
              <a
                href={"mailto:" + BRAND.email}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
