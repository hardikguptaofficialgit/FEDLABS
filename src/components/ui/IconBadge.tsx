"use client";

import type { Icon } from "@phosphor-icons/react";

type IconBadgeProps = {
  icon: Icon;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: { box: "h-9 w-9", icon: 18 },
  md: { box: "h-11 w-11", icon: 22 },
  lg: { box: "h-14 w-14", icon: 28 },
} as const;

export function IconBadge({ icon: Icon, size = "md", className = "" }: IconBadgeProps) {
  const { box, icon: iconSize } = sizeMap[size];

  return (
    <div
      className={`relative ${box} shrink-0 ${className}`}
      style={{
        clipPath:
          "polygon(0 6px, 6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#ff8a00]/40 via-transparent to-[#ff3c00]/30"
        aria-hidden
      />
      <div className="absolute inset-[1px] flex items-center justify-center bg-[#0a0c10]">
        <span
          className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#ff8a00]/50"
          aria-hidden
        />
        <span
          className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#ff8a00]/50"
          aria-hidden
        />
        <Icon weight="fill" size={iconSize} className="relative text-[#ff8a00]" />
      </div>
    </div>
  );
}
