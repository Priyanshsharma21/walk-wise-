"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText"; // Import SplitText
import styles from "./Hero.module.css";
import { logoSeqImg } from "../../constants";
import { useAnimeContext } from "@/context/animeContext";

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const { navRef } = useAnimeContext();
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  const heroRef = useRef(null);
  const comfortRef = useRef(null);
  const stepIntoRef = useRef(null);
  const zoneRef = useRef(null);
  const imageSequenceRef = useRef(null); // Reference for the image sequence div

  // Preload Image Sequence
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];
      const batchSize = 50;

      for (let i = 0; i < logoSeqImg.length; i += batchSize) {
        const batch = logoSeqImg.slice(i, i + batchSize);
        const batchPromises = batch.map(
          (url) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = url;
              img.onload = () => resolve(img);
            })
        );
        const loadedBatch = await Promise.all(batchPromises);
        loadedImages.push(...loadedBatch);
      }

      setImages(loadedImages);
    };

    preloadImages();
  }, []);

  // GSAP Image Sequence Animation
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    ScrollTrigger.create({
      trigger: canvasRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const index = Math.min(
          logoSeqImg.length - 1,
          Math.ceil(progress * logoSeqImg.length)
        );
        setFrameIndex(index);

        const newColorOpacity = 1 - Math.min(progress * 2, 1);
        const newColorOpacityForScroll = 1 - Math.min(progress * 21, 1);
        canvasRef.current.style.backgroundColor = `rgba(0, 0, 0, ${newColorOpacity})`;
        scrollRef.current.style.opacity = newColorOpacityForScroll;
      },
      onLeave: () => {
        setContentVisible(true);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Render Image Sequence
  useEffect(() => {
    if (!canvasRef.current || images.length < 1) return;

    const context = canvasRef.current.getContext("2d");
    let requestId;

    const render = () => {
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (images[frameIndex]) {
        context.drawImage(
          images[frameIndex],
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
      requestId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(requestId);
  }, [frameIndex, images]);

  // Stagger text animation with SplitText and blur to opacity transition
  useEffect(() => {
    const element = heroRef.current;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 20%",
      end: "top top",
      onEnter: () => {
        gsap.to(navRef.current, {
          opacity: 1,
          duration: 0.8, // Adjust duration for the smoothness of the animation
          ease: "power2.out", // Apply easing for a smoother transition
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          opacity: 0,
          duration: 0.8, // Same duration for consistency
          ease: "power2.out", // Apply easing for a smoother transition
        });
      },
    });

    if (contentVisible) {
      const splitComfortText = new SplitText(comfortRef.current, {
        type: "chars",
      });
      const chars = splitComfortText.chars;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            ease: "power1.inOut",
          },
        })
        .fromTo(
          heroRef.current,
          { opacity: 0, filter: "blur(20px)" },
          { opacity: 1, filter: "blur(0px)", duration: 2 }
        )
        .fromTo(
          chars,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 2,
            ease: "power4.inOut",
            scrub: true,
          }
        )
        .fromTo(
          stepIntoRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power1.out" }
        )
        .fromTo(
          zoneRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power1.out" }
        );
    }

    return () => {
      trigger.kill();
    };
  }, [contentVisible]);

  return (
    <>
      <div
        className={`${styles.imageSequence} relative`}
        style={{ height: "100vh", width: "100%" }}
        ref={imageSequenceRef}
      >
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={1920}
          height={1080}
        />
      </div>
      <div ref={scrollRef} className={styles.scrollDown}>
        LA MARCA
      </div>
      <div className="w-full h-[250vh]" />
      <section
        className={`${styles.hero} w-full min-h-full`}
        ref={heroRef} // Reference to the hero section for ScrollTrigger
      >
        <div
          className={`${styles.heroContent} flex flex-col`}
          style={{
            opacity: contentVisible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <h4
            ref={stepIntoRef}
            className={`${styles.heroSubTitle} text-6xl text-white text-left`}
            style={{ opacity: 0 }}
          >
            step into the
          </h4>

          <h1
            className={`${styles.heroTitle} text-6xl text-white flex items-center`}
            ref={comfortRef}
          >
            comfort
          </h1>

          <h4
            ref={zoneRef}
            className={`${styles.heroSubTitle2} text-6xl text-white text-right`}
            style={{ opacity: 0 }}
          >
            zone
          </h4>
        </div>
      </section>
      <div className="w-full h-[150vh]" />
    </>
  );
};

export default Hero;
