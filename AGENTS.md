# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Create an e-commerce landing page with product cards

Additional details provided by the user:
- What is your store name or brand?: Asad
- What type of products will you sell?: General / Mixed

## Goal
Build a bold, modern e-commerce landing page for "Asad" store with product cards, category filters, featured/new arrivals sections, and a newsletter signup.

## Project type
e-commerce

## Design system — match this exactly
- Color tokens: `--background: #1a1a2e`, `--foreground: #f5f5f5`, `--card: #16213e`, `--border: #0f3460`, `--muted-foreground: #a0a8c0`, `--primary: #e94560`, `--accent: #f5a623`, `--accent-foreground: #1a1a2e`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`footer`, `nav`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
