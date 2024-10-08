"use client"; // Ensures the component is only rendered on the client side

import React, { useState, useEffect } from "react";
import styles from "./Website.module.css";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import { useAnimeContext } from "@/context/animeContext";
import Introduction from "../Introduction/Introduction";
import VideoShow from "../VideoShowcase/VideoShow";
import Gallary from "../Gallary/Gallary";
import Contact from "../Contact/Contact";
import { pilot, prestige, prime } from "@/constants";

const Website = () => {
  const { showWebsite, isLoaderCompleted } = useAnimeContext();
  const [activeButton, setActiveButton] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  // Handle window resize event
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const showMainWebsite = () => {
    return isLoaderCompleted && showWebsite;
  };

  return (
    <section
      className={styles.website}
      // style={{ opacity: showMainWebsite() ? 1 : 0 }}
    >
      <div className={styles.gradientBackground}></div>
      <div className={styles.glassLayer}></div>

      <div className={styles.content}>
        <Navbar />
        <Hero
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1920}
          initialHeight={1080}
        />
        <Introduction
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1920}
          initialHeight={1080}
        />

        <div className="w-full h-[20vh]" />
        <VideoShow />

        <Gallary
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1920}
          initialHeight={1080}
          data={pilot}
          heightBelow={"0vh"}
          isActive={activeButton}
          setActive={setActiveButton}
        />
        <Gallary
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1920}
          initialHeight={1080}
          data={prime}
          heightBelow={"0vh"}
          isActive={activeButton}
          setActive={setActiveButton}
        />
        <Gallary
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1920}
          initialHeight={1080}
          data={prestige}
          heightBelow={"100vh"}
          isActive={activeButton}
          setActive={setActiveButton}
        />

        <div className="w-full h-screen" />
        <Contact />
      </div>
    </section>
  );
};

export default Website;
