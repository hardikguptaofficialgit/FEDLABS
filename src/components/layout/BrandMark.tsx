"use client";

import Image from "next/image";
import { Flask } from "@phosphor-icons/react";

type BrandMarkProps = {
  logoSize?: number;
  className?: string;
};

export function BrandMark({ logoSize = 40, className = "" }: BrandMarkProps) {
  const flaskSize = Math.round(logoSize * 0.55);

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <Image
        src="/logo.svg"
        alt="FED logo"
        width={logoSize}
        height={logoSize}
        className="shrink-0 rounded-full"
      />
      <span className="inline-flex items-center gap-1.5 leading-none">
        <span className="font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
          FED
        </span>
        <span className="inline-flex items-center gap-1">
          <Flask
            weight="fill"
            size={flaskSize}
            className="shrink-0 text-accent-orange"
            aria-hidden
          />
          <span className="font-display text-xl font-bold text-gradient sm:text-2xl">
            Labs
          </span>
        </span>
      </span>
    </span>
  );
}
