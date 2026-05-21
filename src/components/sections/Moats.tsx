"use client";

import { ShieldCheck } from "@phosphor-icons/react";
import { moatItems } from "@/lib/content";
import { IconBadge } from "@/components/ui/IconBadge";
import { TechCard, TechChip } from "@/components/ui/TechCard";

export function Moats() {
  return (
    <section className="border-t border-border-glass bg-page-bg px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <TechCard size="lg" innerClassName="px-6 py-10 sm:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:text-left">
            <IconBadge icon={ShieldCheck} size="lg" />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-text-primary">
                Built for teams, not solo bots
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                Permissions, approval flows, and audit logs - so founders and
                co-founders market together without losing control.
              </p>
            </div>
            <ul className="flex flex-wrap justify-center gap-2 sm:justify-end">
              {moatItems.map((item) => (
                <li key={item.label}>
                  <TechChip>{item.label}</TechChip>
                </li>
              ))}
            </ul>
          </div>
        </TechCard>
      </div>
    </section>
  );
}
