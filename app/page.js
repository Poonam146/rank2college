"use client";
import HeroSection from "@/components/HeroSection";
import HowToUse from "@/components/HowToUse";

export default function Home() {
  return (
    <div className="h-full w-full p-5">
      <HeroSection />
      <HowToUse />
    </div>
  );
}
