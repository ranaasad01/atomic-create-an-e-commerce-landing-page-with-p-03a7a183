import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Asad Store — Shop Everything",
  description:
    "Asad brings you the best in electronics, lifestyle, fashion, and home essentials — curated for quality, priced for everyone.",
  icons: {
    icon: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/logos/03a7a183-510f-4804-9261-d3b87d909420/d8ef70620a8c42ff901c7874221bad50.png",
  },
  openGraph: {
    title: "Asad Store — Shop Everything",
    description:
      "Shop thousands of products with fast delivery and zero hassle. Electronics, fashion, home essentials and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-body antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}