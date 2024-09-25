"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader/Preloader";
import Website from "@/components/Website/Website";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/* The following plugin is a Club GSAP perk */
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useAnimeContext } from "@/context/animeContext";

gsap.registerPlugin(useGSAP, ScrollSmoother);

const page = () => {
  const { navRef } = useAnimeContext();
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.04,
    });
    navRef.current.style.opacity = 0;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="app">
      {/* <Preloader /> */}
      <Website />
    </main>
  );
};

export default page;
