"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { products, statusLabels } from "@/lib/content";
import { UnifyLogo } from "@/components/brand/UnifyLogo";
import { productIconMap } from "@/lib/product-icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { TechCard, TechChip } from "@/components/ui/TechCard";

export function Products() {
  const featured = products.find((p) => p.featured);
  const others = products.filter((p) => !p.featured);

  return (
    <section
      id="products"
      className="border-t border-border-glass bg-surface px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow text-text-muted">
            Roadmap
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            From <span className="text-gradient">Unify</span> to what&apos;s next
          </h2>
          <div className="section-heading-line mt-4" />
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            Our first ship is founder marketing automation. More FED Engineering
            products are on the way.
          </p>
        </div>

        {featured && (
          <TechCard
            as="article"
            variant="featured"
            size="lg"
            className="mb-6"
            innerClassName="p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-start gap-4 sm:gap-6">
              <div
                className="flex h-[72px] w-[72px] shrink-0 items-center justify-center sm:h-20 sm:w-20"
                style={{
                  clipPath:
                    "polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <UnifyLogo size={48} priority />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusLabels[featured.status].className}`}
                    style={{
                      clipPath:
                        "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
                      border: "1px solid rgba(255,138,0,0.25)",
                    }}
                  >
                    {statusLabels[featured.status].label}
                  </span>
                  <span className="text-xs text-text-muted">
                    First product · Shipping now
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  {featured.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-orange">
                  {featured.tagline}
                </p>
                <p className="mt-2 max-w-xl text-sm text-text-muted">
                  {featured.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {featured.highlights.map((h) => (
                    <li key={h}>
                      <TechChip accent>{h}</TechChip>
                    </li>
                  ))}
                </ul>
              </div>
              {featured.href && (
                <a
                  href={featured.href}
                  className="inline-flex items-center gap-2 border border-accent-orange/40 bg-accent-orange/10 px-4 py-2 text-sm font-medium text-accent-orange transition-colors hover:bg-accent-orange/20"
                  style={{
                    clipPath:
                      "polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                  }}
                >
                  View app
                  <ArrowRight weight="fill" size={16} />
                </a>
              )}
            </div>
          </TechCard>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {others.map((product) => {
            const Icon = productIconMap[product.icon];
            const status = statusLabels[product.status];

            return (
              <TechCard key={product.id} as="article" innerClassName="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <IconBadge icon={Icon} size="md" />
                  <span
                    className={`shrink-0 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${status.className}`}
                    style={{
                      clipPath:
                        "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
                    }}
                  >
                    {status.label}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-primary">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-accent-orange">
                  {product.tagline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {product.description}
                </p>
              </TechCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
