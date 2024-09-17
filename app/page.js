"use client";
import { useAnimeContext } from "../context/animeContext";
import React, { useEffect } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader/Preloader";
import Navbar from "@/components/Navbar/Navbar";
import Card from "@/components/Card";
import Hero from "@/components/Hero/Hero";
import Introduction from "@/components/Introduction/Introduction";
import Demo from "@/components/Demo/Demo";
import Video from "@/components/Video/Video";

const page = () => {
  const { isMobile } = useAnimeContext();

  useEffect(() => {
    // Adjust Lenis for more easing and smoother effect
    const lenis = new Lenis({
      lerp: 0.05, // A slightly higher lerp for smoother transition (adjust as needed)
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
    <main className="app w-full">
      <Preloader />
      <div className="app-content">
        <div>
          <Card height="100vh" component={<Hero />} />
          <Card height="100vh" component={<Introduction />} />
          <div>
            <Card height="100vh" component={<Demo height={"100vh"} />} />
          </div>
          <div className="w-full h-[147vh]" />
          <div>
            <Card height="100vh" component={<Video />} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
