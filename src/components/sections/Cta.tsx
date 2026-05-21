"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { flagshipProduct, siteConfig } from "@/lib/content";
import { TechCard } from "@/components/ui/TechCard";

export function Cta() {
  return (
    <section className="border-t border-border-glass bg-page-bg px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <TechCard size="lg" variant="featured" innerClassName="px-6 py-12 sm:px-12">
          <p className="eyebrow text-accent-orange">
            Early access · {flagshipProduct.name}
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Automate marketing from one{" "}
            <span className="text-gradient">minimal workspace</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-muted">
            Join the waitlist for {flagshipProduct.name} - connect Reddit, X, and
            your team. Built by FED Engineering for founders everywhere.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=Unify%20Early%20Access`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffb347] via-[#ff7a00] to-[#ff3c00] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                clipPath:
                  "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
              }}
            >
              Request early access
              <ArrowRight weight="fill" size={16} />
            </a>
            <a
              href={siteConfig.fedMainUrl}
              className="inline-flex border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-text-muted transition-colors hover:border-accent-orange/40 hover:text-text-primary"
              style={{
                clipPath:
                  "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
              }}
            >
              FED Society
            </a>
          </div>
        </TechCard>
      </div>
    </section>
  );
}
