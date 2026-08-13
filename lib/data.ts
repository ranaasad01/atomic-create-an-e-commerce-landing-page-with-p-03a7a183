export interface NavLink {
  label: string;
  href: string;
  key: string;
  isCta?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  category: string;
  description: string;
}

export const APP_NAME = "Asad";
export const APP_TAGLINE = "Shop Everything.";
export const LOGO_URL =
  "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/logos/03a7a183-510f-4804-9261-d3b87d909420/d8ef70620a8c42ff901c7874221bad50.png";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Best Sellers", href: "#featured-products", key: "bestSellers" },
  { label: "New Arrivals", href: "#new-arrivals", key: "newArrivals" },
  { label: "Categories", href: "#category-filters", key: "categories" },
  { label: "Sale", href: "#promo-banner", key: "sale" },
  { label: "Login", href: "/login", key: "login" },
  { label: "Sign Up", href: "/signup", key: "signUp", isCta: true },
  { label: "Shop Now", href: "#featured-products", key: "shopNow", isCta: true },
];
