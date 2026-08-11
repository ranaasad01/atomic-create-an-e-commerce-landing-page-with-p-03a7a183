"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Mail } from 'lucide-react';
import { LOGO_URL } from "@/lib/data";

export default function Footer() {
  const t = useTranslations();

  const footerColumns = [
    {
      heading: t("footer.shopHeading"),
      links: [
        t("footer.shopAllProducts"),
        t("footer.shopBestSellers"),
        t("footer.shopNewArrivals"),
        t("footer.shopSale"),
        t("footer.shopGiftCards"),
      ],
    },
    {
      heading: t("footer.helpHeading"),
      links: [
        t("footer.helpFaqs"),
        t("footer.helpTrack"),
        t("footer.helpReturns"),
        t("footer.helpContact"),
        t("footer.helpSizeGuide"),
      ],
    },
    {
      heading: t("footer.companyHeading"),
      links: [
        t("footer.companyAbout"),
        t("footer.companyCareers"),
        t("footer.companyPress"),
        t("footer.companySustainability"),
        t("footer.companyAffiliate"),
      ],
    },
    {
      heading: t("footer.legalHeading"),
      links: [
        t("footer.legalPrivacy"),
        t("footer.legalTerms"),
        t("footer.legalCookies"),
        t("footer.legalAccessibility"),
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:support@asadstore.com" },
  ];

  return (
    <footer className="bg-[var(--card)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={LOGO_URL}
                alt="Asad logo"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6 max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition-colors duration-200"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wider">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {(
              Array.isArray(t.raw("footer.paymentMethods"))
                ? t.raw("footer.paymentMethods")
                : []
            ).map((method: string) => (
              <span
                key={method}
                className="px-2 py-1 text-xs font-medium bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] rounded-lg"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.secureCheckout")}
          </p>
        </div>
      </div>
    </footer>
  );
}