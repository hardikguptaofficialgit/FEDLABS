"use client";

import Image from "next/image";
import { UNIFY_LOGO_PATH } from "@/lib/assets";

type UnifyLogoProps = {
  /** Square box size (px) the logo fits inside */
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  className?: string;
  priority?: boolean;
};

export function UnifyLogo({
  size = 32,
  showWordmark = false,
  wordmarkClassName = "",
  className = "",
  priority,
}: UnifyLogoProps) {
  const shouldPrioritize = priority ?? size >= 40;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <span
        className="relative inline-flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
        aria-hidden={showWordmark}
      >
        <Image
          src={UNIFY_LOGO_PATH}
          alt={showWordmark ? "" : "Unify"}
          fill
          sizes={`${size}px`}
          className="object-contain object-center"
          priority={shouldPrioritize}
          unoptimized
        />
      </span>
      {showWordmark && (
        <span
          className={`font-display text-lg font-bold tracking-tight text-white sm:text-xl ${wordmarkClassName}`.trim()}
        >
          Unify
        </span>
      )}
    </div>
  );
}

export function UnifyAvatar({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const pad = Math.max(4, Math.round(size * 0.12));

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-[#1a1a1a] ring-1 ring-white/12 ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute"
        style={{ inset: pad }}
        aria-hidden
      >
        <Image
          src={UNIFY_LOGO_PATH}
          alt=""
          fill
          sizes={`${size}px`}
          className="object-contain object-center"
          unoptimized
        />
      </span>
    </div>
  );
}
