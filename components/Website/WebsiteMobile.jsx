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
import { logoSeqImgMobile, pilot, prestige, prime } from "@/constants";
import Sawal from "../Faq/Sawal";
import Lamarca from "../LaMarca/Lamarca";
import Sampark from "../Contact/Sampark";
import LogoReveal from "../LogoReveal/LogoReveal";
import HeroText from "../HeroText/HeroText";
import MobileShow from "../VideoShowcase/MobileShow";
import IntroductionMobile from "../Introduction/IntroductionMobile";

const WebsiteMobile = () => {
  const { showWebsite, isLoaderCompleted, xsSize, isMobile } =
    useAnimeContext();
  const [activeButton, setActiveButton] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

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
      style={{ opacity: showMainWebsite() ? 1 : 0 }}
    >
      <div className={styles.gradientBackground}></div>
      <div className={styles.glassLayer}></div>

      <div className={styles.content}>
        <Navbar />

        <Hero
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1080}
          initialHeight={1920}
          imgSeq={logoSeqImgMobile}
        />

        <div className="w-full h-screen" />

        <IntroductionMobile
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1920}
          initialHeight={1080}
        />

        <div className="w-full h-screen" />

        <div className="w-full h-[20vh]" />
        <MobileShow />

        <Lamarca />
        {xsSize && <div className="w-full h-[60vh]" />}

        <Gallary
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1080}
          initialHeight={1920}
          data={pilot}
          heightBelow={"0vh"}
          isActive={activeButton}
          setActive={setActiveButton}
          imgSeq={pilot.imgSequenceMobile}
        />
        <Gallary
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1080}
          initialHeight={1920}
          data={prime}
          heightBelow={"0vh"}
          isActive={activeButton}
          setActive={setActiveButton}
          imgSeq={prime.imgSequenceMobile}
        />
        <Gallary
          width={dimensions.width}
          height={dimensions.height}
          initialWidth={1080}
          initialHeight={1920}
          data={prestige}
          heightBelow={"100vh"}
          isActive={activeButton}
          setActive={setActiveButton}
          imgSeq={prestige.imgSequenceMobile}
        />
        <div className="w-full h-screen" />

        <Sawal />

        <Contact />
      </div>
    </section>
  );
};

export default WebsiteMobile;
