"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader/Preloader";
import Website from "@/components/Website/Website";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimeContext } from "@/context/animeContext";

gsap.registerPlugin(useGSAP);

const Page = () => {
  const { navRef, enableSmoothScroll } = useAnimeContext();

  useEffect(() => {
    let lenis;

    if (enableSmoothScroll) {
      // Initialize Lenis if smooth scroll is enabled
      lenis = new Lenis({
        lerp: 0.04,
      });

      navRef.current.style.opacity = 0;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      // Destroy Lenis when component unmounts or if smooth scrolling is disabled
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [enableSmoothScroll, navRef]);

  return (
    <main className="app">
      <Preloader />
      <Website />
    </main>
  );
};

export default Page;
