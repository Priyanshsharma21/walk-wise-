"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [videoVisible, setVideoVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const heroRef = useRef(null);
  const comfortRef = useRef(null);
  const stepIntoRef = useRef(null);
  const zoneRef = useRef(null);

  useEffect(() => {
    // Delay the video appearance by 1 second
    const videoDelay = setTimeout(() => {
      setVideoVisible(true);
    }, 1000);

    return () => clearTimeout(videoDelay);
  }, []);

  const handleVideoEnd = () => {
    setVideoVisible(false);
    setContentVisible(true);

    // GSAP Stagger Animation for "comfort"
    const comfortText = comfortRef.current.querySelectorAll("span");
    gsap.fromTo(
      comfortText,
      { rotateY: 0, opacity: 0 },
      {
        rotateY: 360,
        duration: 1,
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.1,
        onComplete: () => {
          // Animate "step into the" and "zone" after "comfort" animation
          gsap.fromTo(
            stepIntoRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power1.out" }
          );
          gsap.fromTo(
            zoneRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power1.out" }
          );
        },
      }
    );

    // Scroll-triggered fade-out with blur
    gsap.to(heroRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top", // Start pinning at the top of the viewport
        end: "+=500", // The length of scroll for the animation
        scrub: true, // Link the animation timing to scroll
        pin: true, // Pin the content in place
        ease: "power1.inOut",
      },
    });
  };

  return (
    <section
      className={`${styles.hero} w-full min-h-screen`}
      ref={heroRef} // Reference to the hero section for ScrollTrigger
    >
      {/* Conditionally render the video after 1 second */}
      {videoVisible && (
        <div
          className={styles.heroVideoBox}
          style={{
            opacity: videoVisible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <video
            className={styles.video}
            src="/videohero.mp4"
            autoPlay
            muted
            onEnded={handleVideoEnd}
          />
        </div>
      )}

      <div
        className={`${styles.heroContent} flex flex-col`}
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        {/* "step into the" text */}
        <h4
          ref={stepIntoRef}
          className={`${styles.heroSubTitle} text-6xl text-white text-left`}
          style={{ opacity: 0 }} // Initial opacity 0 for animation
        >
          step into the
        </h4>

        {/* Staggered "comfort" text */}
        <h1
          className={`${styles.heroTitle} text-6xl text-white flex items-center`}
          ref={comfortRef}
        >
          <span>c</span>
          <span className={styles.customO}>
            <img src="/herologo.png" alt="logo" />
          </span>
          <span>m</span>
          <span>f</span>
          <span>o</span>
          <span>r</span>
          <span>t</span>
        </h1>

        {/* "zone" text */}
        <h4
          ref={zoneRef}
          className={`${styles.heroSubTitle2} text-6xl text-white text-right`}
          style={{ opacity: 0 }} // Initial opacity 0 for animation
        >
          zone
        </h4>
      </div>
    </section>
  );
};

export default Hero;
