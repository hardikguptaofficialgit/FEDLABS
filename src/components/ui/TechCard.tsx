import type { ElementType, ReactNode } from "react";

type TechCardSize = "sm" | "md" | "lg";
type TechCardVariant = "default" | "featured";

type TechCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  size?: TechCardSize;
  variant?: TechCardVariant;
  as?: ElementType;
};

const sizeClasses: Record<TechCardSize, string> = {
  sm: "p-4 rounded-2xl",
  md: "p-5 rounded-[26px]",
  lg: "p-7 rounded-[32px]",
};

/* local cn helper */
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function TechCard({
  children,
  className = "",
  innerClassName = "",
  size = "md",
  variant = "default",
  as: Component = "div",
}: TechCardProps) {
  return (
    <Component
      className={cn(
        `
          group
          relative
          overflow-hidden
          border
          border-white/[0.06]
          bg-[#0B0B0B]
          backdrop-blur-xl
          transition-all
          duration-300
        `,
        variant === "featured" &&
          `
            border-[#FF6200]/20
            bg-[linear-gradient(180deg,#101010_0%,#0B0B0B_100%)]
          `,
        sizeClasses[size],
        className
      )}
    >

      {/* top line */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent
        "
      />

      {/* featured orange blur */}
      {variant === "featured" && (
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-40
            w-40
            rounded-full
            bg-[#FF6200]/10
            blur-3xl
          "
        />
      )}

      {/* content */}
      <div
        className={cn(
          `
            relative
            z-10
          `,
          innerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}

type TechChipProps = {
  children: ReactNode;
  accent?: boolean;
  className?: string;
};

export function TechChip({
  children,
  accent = false,
  className = "",
}: TechChipProps) {
  return (
    <span
      className={cn(
        `
          inline-flex
          items-center
          rounded-full
          border
          px-3
          py-1.5
          text-[11px]
          font-medium
          tracking-wide
        `,
        accent
          ? `
              border-[#FF6200]/20
              bg-[#FF6200]/10
              text-[#FFAE43]
            `
          : `
              border-white/[0.06]
              bg-white/[0.03]
              text-neutral-400
            `,
        className
      )}
    >
      {children}
    </span>
  );
}