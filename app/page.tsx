import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Features } from "@/components/features";
import { Layers } from "@/components/layers";
import { Benefits } from "@/components/benefits";
import { Comparison } from "@/components/comparison";
import { Security } from "@/components/security";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Features />
      <Layers />
      <Benefits />
      <Comparison />
      <Security />
      <Faq />
      <FinalCta />
    </>
  );
}
