"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, LOGO_URL } from "@/lib/data";

export default function Navbar() {
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--card)] shadow-[0_4px_24px_rgba(0,0,0,0.45)] border-b border-[var(--border)]"
          : "bg-[var(--background)]/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src={LOGO_URL}
              alt="Asad logo"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks
              .filter((link) => !link.isCta)
              .map((link) => (
                <Link
                  key={link.key}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 rounded-lg hover:bg-[var(--border)]/30"
                >
                  {navT[link.key] ?? link.label}
                </Link>
              ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              aria-label={t("nav.searchLabel")}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/30 transition-all duration-200"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Cart */}
            <button
              aria-label={t("nav.cartLabel")}
              className="relative flex items-center justify-center w-9 h-9 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/30 transition-all duration-200"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-[var(--primary)] text-white rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA */}
            {navLinks
              .filter((link) => link.isCta)
              .map((link) => (
                <Link
                  key={link.key}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold bg-[var(--primary)] text-white rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 shadow-[0_4px_14px_rgba(233,69,96,0.4)]"
                >
                  {navT[link.key] ?? link.label}
                </Link>
              ))}

            {/* Mobile Menu Toggle */}
            <button
              aria-label={t("nav.menuLabel")}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/30 transition-all duration-200"
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[var(--card)] border-t border-[var(--border)]"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    link.isCta
                      ? "bg-[var(--primary)] text-white text-center font-semibold mt-2"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/30"
                  }`}
                >
                  {navT[link.key] ?? link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}