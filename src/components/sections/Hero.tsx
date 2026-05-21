"use client";

import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { HERO_BG_PATH } from "@/lib/assets";
import { heroContent, heroRotatingWords } from "@/lib/content";

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const word = heroRotatingWords[wordIndex];
    const speed = isDeleting ? 40 : 85;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(word.substring(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setDisplayText(word.substring(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }

      if (!isDeleting && charIndex === word.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % heroRotatingWords.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section className="hero-section flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden">
      <div className="hero-section__bg" aria-hidden>
        <Image
          src={HERO_BG_PATH}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="hero-section__scrim" aria-hidden />

      <div className="relative z-[2] mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-12 text-center sm:px-6">
        {/* Logo */}
        <BrandMark logoSize={48} className="mb-6 justify-center" />


        {/* Subtitle */}
        <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg sm:leading-relaxed">
          {heroContent.subtitle}
        </p>

        {/* Typewriter Effect */}
        <p
          className="font-display mt-4 min-h-[1.5em] text-lg font-semibold tracking-tight text-[#ffb347] sm:text-xl"
          aria-live="polite"
        >
          {displayText}
          <span
            className="ml-1 inline-block w-[2px] animate-pulse bg-[#ff7a00] align-middle"
            style={{ height: "1.1em" }}
          />
        </p>

        {/* Compact Actions */}
        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <a
            href="#unify"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] via-[#ff7a00] to-[#ff3c00] px-6 py-2.5 text-sm font-semibold text-white  sm:w-auto sm:min-w-[160px]"
          >
            Explore products
            <ArrowRight
              weight="bold"
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#about"
            className="flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/70 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white sm:w-auto sm:min-w-[160px]"
          >
            About us
          </a>
        </div>

        {/* Stats — technical clip + moving border beam */}
        <div className="tech-card tech-card--lg tech-card--beam relative mt-12 w-full max-w-lg">
          <div className="tech-card__beam" aria-hidden />
          <div className="tech-card__inner grid grid-cols-3 divide-x divide-white/[0.08]">
            <span className="tech-card__grid" aria-hidden />
            <span className="tech-card__accent" aria-hidden />
            {heroContent.stats.map((stat) => (
              <div
                key={stat.label}
                className="relative z-[1] flex flex-col items-center justify-center px-3 py-5 sm:py-6"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                  {stat.label}
                </span>
                <span className="mt-1.5 text-center text-sm font-semibold text-white sm:text-[15px]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30 transition-colors hover:text-white/50"
        aria-label="Scroll to content"
      >
        <span>Scroll</span>
        <ArrowDown weight="bold" size={14} className="animate-bounce" />
      </a>
    </section>
  );
}