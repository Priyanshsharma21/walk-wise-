"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText"; // Import SplitText
import styles from "./Hero.module.css";
import { useAnimeContext } from "@/context/animeContext";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroMobile = ({ width, height, initialWidth, initialHeight, imgSeq }) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [showBrandName, setShowBrandName] = useState(false);
  const { navRef, setShowWebsite, showWebsite, isLoaderCompleted, xsSize } =
    useAnimeContext();
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  const heroRef = useRef(null);
  const comfortRef = useRef(null);
  const stepIntoRef = useRef(null);
  const zoneRef = useRef(null);
  const imageSequenceRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];
      const batchSize = 100;

      for (let i = 0; i < imgSeq.length; i += batchSize) {
        const batch = imgSeq.slice(i, i + batchSize);
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
        if (i === 100) {
          setShowWebsite(true);
        }
      }

      setImages(loadedImages);
    };

    preloadImages();

    const ctx = canvasRef.current.getContext("2d");

    ScrollTrigger.create({
      trigger: canvasRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const index = Math.min(
          imgSeq.length - 1,
          Math.ceil(progress * imgSeq.length)
        );
        setFrameIndex(index);

        if (index > 75 && index <= 152) {
          setShowBrandName(true);
        } else {
          setShowBrandName(false);
        }

        // const newColorOpacity = 1 - Math.min(progress * 2, 1);
        const newColorOpacityForScroll = 1 - Math.min(progress * 21, 1);
        // canvasRef.current.style.backgroundColor = `rgba(0, 0, 0, ${newColorOpacity})`;
        scrollRef.current.style.opacity = newColorOpacityForScroll;
      },
      onLeave: () => {
        setContentVisible(true);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width, height]);

  // Render Image Sequence
  useEffect(() => {
    if (!canvasRef.current || images.length < 1) return;

    const context = canvasRef.current.getContext("2d");
    let requestId;

    const render = () => {
      context.clearRect(0, 0, canvasSize.width, canvasSize.height);
      if (images[frameIndex]) {
        context.drawImage(
          images[frameIndex],
          0,
          0,
          canvasSize.width,
          canvasSize.height
        );
      }
      requestId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(requestId);
  }, [frameIndex, images, canvasSize]);

  useEffect(() => {
    const handleResize = () => {
      const aspectRatio = initialWidth / initialHeight;
      const newWidth = window.innerWidth;
      const newHeight = newWidth / aspectRatio;
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [initialWidth, initialHeight]);

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
      const splitStepIntoText = new SplitText(stepIntoRef.current, {
        type: "chars",
      });
      const splitZoneText = new SplitText(zoneRef.current, {
        type: "chars",
      });
      const splitChar = splitComfortText.chars;
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
          splitChar,
          { y: 250, opacity: 0, overflow: "hidden" },
          {
            y: 0,
            opacity: 1,
            overflow: "hidden",
            stagger: 1,
            duration: 10,
            ease: "power4.inOut",
            scrub: true,
          }
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
  }, [contentVisible]);

  const revealMask = {
    initial: { y: "100%" },
    animate: (i) => ({
      y: "0%",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.2 * i },
    }),
  };

  return (
    <>
      <div
        className={`relative`}
        style={{ height: "100vh", width: "100%" }}
        ref={imageSequenceRef}
      >
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={initialWidth}
          height={initialHeight}
        />
      </div>
      <div ref={scrollRef} className={styles.scrollDown}>
        <Tilt
          className="background-stripes track-on-window"
          perspective={500}
          glareEnable={true}
          glareMaxOpacity={0}
          glarePosition="all"
          scale={1.02}
          trackOnWindow={true}
        >
          <div className="inner-element">
            <img
              className={styles.scrollImg}
              src="https://res.cloudinary.com/detngwnov/image/upload/v1729772989/Group_zbokcj.png"
              alt="scrollToBegin Image"
            />
            {isLoaderCompleted && showWebsite ? (
              <div className={styles.scrollToBegin}>
                <div className="w-full overflow-hidden">
                  <motion.div
                    custom={1}
                    variants={revealMask}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div>Scroll</motion.div>
                  </motion.div>
                </div>

                <div className="w-full overflow-hidden">
                  <motion.div
                    custom={2}
                    variants={revealMask}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div>To</motion.div>
                  </motion.div>
                </div>

                <div className="w-full overflow-hidden">
                  <motion.div
                    custom={3}
                    variants={revealMask}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div>Begin</motion.div>
                  </motion.div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Tilt>
      </div>

      <div className="w-full h-[250vh]" />

      <div className="w-full h-[50vh]" />
    </>
  );
};

export default HeroMobile;
