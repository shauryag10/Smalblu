import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Layers } from "@/components/layers";
import { Bento } from "@/components/bento";
import { Proof } from "@/components/proof";
import { Comparison } from "@/components/comparison";
import { Security } from "@/components/security";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Layers />
      <Bento />
      <Proof />
      <Comparison />
      <Security />
      <Faq />
      <FinalCta />
    </>
  );
}
