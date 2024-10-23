"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Lamarca.module.css";
import { logoSeqImg } from "../../constants";
import { useAnimeContext } from "@/context/animeContext";
import SplitText from "gsap/SplitText"; // Import SplitText

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = ({ width, height, initialWidth, initialHeight }) => {
  const [contentVisible, setContentVisible] = useState(false);
  const { navRef, setShowWebsite, showWebsite, isLoaderCompleted, xsSize } =
    useAnimeContext();
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const stepIntoRef = useRef(null);
  const zoneRef = useRef(null);
  const imageRef = useRef(null); // Ref for the image

  useEffect(() => {
    ScrollTrigger.create({
      trigger: canvasRef.current,
      start: "top center",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const index = Math.min(
          logoSeqImg.length - 1,
          Math.ceil(progress * logoSeqImg.length)
        );
        setFrameIndex(index);

        const newColorOpacityForScroll = 1 - Math.min(progress * 21, 1);
      },
      onLeave: () => {
        setContentVisible(true);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width, height]);

  // Render Image Sequence Animation
  useEffect(() => {
    const element = heroRef.current;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 20%",
      end: "top top",
      onEnter: () => {
        gsap.to(navRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
    });

    if (contentVisible) {
      const splitStepIntoText = new SplitText(stepIntoRef.current, {
        type: "chars",
      });
      const splitZoneText = new SplitText(zoneRef.current, {
        type: "chars",
      });
      const stepChars = splitStepIntoText.chars;
      const zoneChars = splitZoneText.chars;
      const getStart = () => {
        if (xsSize) {
          return "top top";
        } else {
          return "top +=50";
        }
      };
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: getStart(),
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
          stepChars,
          { opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 7,
            ease: "power4.inOut",
            scrub: true,
          }
        )
        .fromTo(
          imageRef.current,
          { y: 250, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 10,
            ease: "power4.inOut",
            scrub: true,
          }
        )
        .fromTo(
          zoneChars,
          { opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 7,
            ease: "power4.inOut",
            scrub: true,
          }
        );
    }

    return () => {
      trigger.kill();
    };
  }, [contentVisible, xsSize]);

  return (
    <>
      <div className="w-full h-[10vh]" />
      <section className={`${styles.hero} w-full min-h-full`} ref={heroRef}>
        <div
          className={`${styles.heroContent} flex flex-col`}
          style={{
            opacity: contentVisible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <h4 ref={stepIntoRef} className={`${styles.heroSubTitle}  text-left`}>
            introducing
          </h4>

          <div className={styles.containerImage}>
            <img
              src="https://res.cloudinary.com/dlxpea208/image/upload/v1728541015/la_marca_italy_png_okn0kg.png"
              alt="LaMarca"
              className={styles.heroImage} // Style this class in CSS for dimensions
              ref={imageRef}
            />
          </div>

          <h4 ref={zoneRef} className={`${styles.heroSubTitle2}  text-right`}>
            from the house of walkwise
          </h4>
        </div>
      </section>
      <div className="w-full h-[110vh]" />
    </>
  );
};

export default Hero;
