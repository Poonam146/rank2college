"use client";
import React from "react";
import { PixelTrail } from "@/components/ui/pixel-trail";
import useScreenSize from "@/components/hooks/use-screen-size";

export default function HeroSection() {
  const screenSize = useScreenSize();

  return (
    <section className="relative w-full h-full min-h-[500px] bg-[#dcddd7] text-black flex flex-col font-calendas overflow-hidden">
      {/* PixelTrail Background */}
      <div className="absolute inset-0 z-0">
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 48 : 80}
          fadeDuration={0}
          delay={1200}
          pixelClassName="rounded-full bg-[#ffa04f] pointer-events-none" 
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full space-y-2 md:space-y-8">
        <h2 className="text-3xl sm:text-5xl md:text-7xl tracking-tight">
          Rank to college
        </h2>
        <p className="text-xs md:text-2xl">predict colleges from JEE Main Rank</p>

        <button
          className="bg-indigo-500 hover:bg-indigo-600 transition-colors px-10 text-lg text-white py-4 rounded-full z-50"
           onClick={() => (window.location.href = "/predictor")}
        >
          Predict College
        </button>
      </div>
    </section>
  );
}
