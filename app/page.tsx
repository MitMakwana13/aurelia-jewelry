import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { NavratnaCollection } from "@/components/home/NavratnaCollection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CustomerStories } from "@/components/home/CustomerStories";
import { GemstoneKnowledgeHub } from "@/components/home/GemstoneKnowledgeHub";

export default function HomePage() {

  return (
    <>
      <Hero />
      <Marquee />
      <NavratnaCollection />
      <WhyChooseUs />
      <CustomerStories />
      <GemstoneKnowledgeHub />
    </>
  );
}
