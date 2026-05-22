import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FED Labs | Unify - AI Marketing Agents for Founders",
  description:
    "Unify by FED Labs - unified AI agents for founder marketing. Connect Reddit, X, and team accounts. Built by FED Engineering.",
  keywords: [
    "FED Labs",
    "FED Society",
    "startup intelligence",
    "founder operating system",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
