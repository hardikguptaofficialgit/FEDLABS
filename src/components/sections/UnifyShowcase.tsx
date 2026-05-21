"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { UnifyLogo } from "@/components/brand/UnifyLogo";
import { UnifyProductDemo } from "@/components/product/UnifyProductDemo";
import { flagshipProduct, workflowSteps } from "@/lib/content";
import { TechCard } from "@/components/ui/TechCard";

export function UnifyShowcase() {
  return (
    <section
      id="unify"
      className="border-t border-border-glass bg-page-bg px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow text-text-muted">
            Product 01 · In preview
          </p>
          <div className="mt-4 flex items-center gap-4">
            <UnifyLogo size={48} showWordmark priority />
          </div>
          <h2 className="mt-3 text-2xl font-bold text-text-primary sm:text-3xl">
            {flagshipProduct.tagline}
          </h2>
          <div className="section-heading-line mt-4" />
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            {flagshipProduct.description} Chat with your marketing agent and
            manage channels, accounts, and runs from the same sidebar - no
            separate windows.
          </p>
        </div>

        <UnifyProductDemo className="mb-14 w-full" />

        <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Chat-first, workspace in the sidebar
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
              Ask Unify to draft Reddit posts, plan X threads, or schedule across
              your team - switch to Channels, Accounts, or Runs from the same
              sidebar without leaving the app.
            </p>
            <ol className="mt-8 space-y-4">
              {workflowSteps.map((step) => (
                <li key={step.step}>
                  <TechCard size="sm" innerClassName="p-4">
                    <div className="flex gap-4">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center text-sm font-bold text-accent-orange"
                        style={{
                          clipPath:
                            "polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                          background: "rgba(255,138,0,0.1)",
                          border: "1px solid rgba(255,138,0,0.35)",
                        }}
                      >
                        {step.step}
                      </span>
                      <div>
                        <p className="font-semibold text-text-primary">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm text-text-muted">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </TechCard>
                </li>
              ))}
            </ol>
          </div>

          <TechCard
            size="md"
            variant="featured"
            className="lg:sticky lg:top-24"
            innerClassName="p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Early access
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Be among the first founders to run {flagshipProduct.name} with your
              team.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-[#ffb347] via-[#ff7a00] to-[#ff3c00] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                clipPath:
                  "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
              }}
            >
              Request access
              <ArrowRight weight="fill" size={16} />
            </a>
          </TechCard>
        </div>
      </div>
    </section>
  );
}
