"use client";

import { features, flagshipProduct } from "@/lib/content";
import { featureIconMap } from "@/lib/feature-icons";
import { IconBadge } from "@/components/ui/IconBadge";
import { TechCard } from "@/components/ui/TechCard";

export function Features() {
  return (
    <section
      id="capabilities"
      className="border-t border-border-glass bg-surface px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-text-muted">
            {flagshipProduct.name} features
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Everything you need for{" "}
            <span className="text-gradient">automated marketing</span>
          </h2>
          <div className="section-heading-line mt-4" />
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            Connect platforms, link your team, and let AI agents handle Reddit,
            X, and more - with approvals when you want control.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = featureIconMap[feature.icon];
            return (
              <TechCard
                key={feature.id}
                as="article"
                size="sm"
                innerClassName="p-5"
              >
                <div className="mb-4">
                  <IconBadge icon={Icon} size="sm" />
                </div>
                <h3 className="text-sm font-bold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {feature.teaser}
                </p>
              </TechCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
