"use client";
import { useAnimeContext } from "../context/animeContext";
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader/Preloader";
import Navbar from "@/components/Navbar/Navbar";
import Card from "@/components/Card";
import Hero from "@/components/Hero/Hero";

const page = () => {
  const { isMobile } = useAnimeContext();
  
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
      <Hero />
    </main>
  );
};

export default page;
