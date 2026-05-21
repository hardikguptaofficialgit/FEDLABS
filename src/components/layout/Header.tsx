"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { navLinks, siteConfig } from "@/lib/content";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-glass bg-gradient-to-b from-[rgba(17,17,21,0.94)] to-[rgba(12,12,16,0.92)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <BrandMark logoSize={40} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.fedMainUrl}
            className="rounded-full border border-border-glass px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:border-accent-orange/50 hover:text-text-primary"
          >
            Back to FED
          </a>
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-[#ffb347] via-[#ff7a00] to-[#ff3c00] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition-opacity hover:opacity-90 text-black"
          >
            Join waitlist
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-border-glass p-2 text-text-primary md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <X weight="fill" size={20} />
          ) : (
            <List weight="fill" size={20} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border-glass bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-base font-medium text-text-muted hover:bg-glass-bg hover:text-text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.fedMainUrl}
              className="rounded-lg px-3 py-2 text-base font-medium text-text-muted hover:bg-glass-bg hover:text-text-primary"
            >
              Back to FED
            </a>
            <a
              href="#contact"
              className="mt-2 rounded-full bg-gradient-to-r from-[#ffb347] via-[#ff7a00] to-[#ff3c00] px-5 py-3 text-center text-sm font-semibold text-black"
              onClick={() => setMobileOpen(false)}
            >
              Join waitlist
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
