"use client";
import { useAnimeContext } from "../context/animeContext";
import React, { useEffect } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader/Preloader";
import Website from "@/components/Website/Website";

const page = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.04,
    });

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
      <Preloader />
      <Website />
    </main>
  );
};

export default page;
