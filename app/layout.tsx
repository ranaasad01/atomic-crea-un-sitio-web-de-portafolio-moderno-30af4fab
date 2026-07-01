import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtomicLangToggle from "@/components/AtomicLangToggle"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Moreno — Desarrollador Full Stack",
  description:
    "Portafolio personal de Alex Moreno. Desarrollador Full Stack especializado en experiencias web modernas, interfaces elegantes y soluciones escalables.",
  keywords: ["desarrollador", "full stack", "portafolio", "react", "next.js", "typescript"],
  authors: [{ name: "Alex Moreno" }],
  openGraph: {
    title: "Alex Moreno — Desarrollador Full Stack",
    description: "Portafolio personal de Alex Moreno. Desarrollador Full Stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0a0a0f] text-slate-200 antialiased selection:bg-violet-600/30 selection:text-violet-200`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
            <AtomicLangToggle />
    </body>
    </html>
  );
}