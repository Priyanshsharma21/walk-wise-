"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader/Preloader";
import Website from "@/components/Website/Website";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimeContext } from "@/context/animeContext";
import WebsiteMobile from "@/components/Website/WebsiteMobile";

gsap.registerPlugin(useGSAP);

const Page = () => {
  const { navRef, enableSmoothScroll, isMobile } = useAnimeContext();

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
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [enableSmoothScroll, navRef]);

  return (
    <main className="app">
      <Preloader />
      {isMobile ? <WebsiteMobile /> : <Website />}
    </main>
  );
};

export default Page;
