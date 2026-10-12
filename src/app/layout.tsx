import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Spectra’26 — Ideas. People. Culture.",
    template: "%s | Spectra’26",
  },
  description:
    "Join CESS for Spectra’26 on 28–29 October 2026 at Maharaja Ranjit Singh Bhawan, Guru Nanak Dev University, Amritsar.",
  icons: { icon: "/images/cess-logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-foreground px-5 py-3 text-sm text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="min-h-[60vh] outline-none"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
