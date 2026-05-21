import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { UnifyShowcase } from "@/components/sections/UnifyShowcase";
import { Products } from "@/components/sections/Products";
import { Features } from "@/components/sections/Features";
import { Moats } from "@/components/sections/Moats";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <UnifyShowcase />
      <Products />
      <Features />
      <Moats />
      <Cta />
    </>
  );
}
