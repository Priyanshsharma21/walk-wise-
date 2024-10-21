import styles from "./LogoReveal.module.css";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText"; // Import SplitText
import { useAnimeContext } from "@/context/animeContext";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger, SplitText);

const LogoReveal = ({
  width,
  height,
  initialWidth,
  initialHeight,
  logoSeqImg,
}) => {
  const {
    setShowWebsite,
    showWebsite,
    isLoaderCompleted,
    xsSize,
    setContentVisible,
  } = useAnimeContext();

  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  const imageSequenceRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
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
        if (i === 50) {
          setShowWebsite(true);
        }
      }

      setImages(loadedImages);
    };

    preloadImages();

    const ctx = canvasRef.current.getContext("2d");

    const getStart = () => {
      if (xsSize) {
        return "top top";
      } else {
        return "top -=100";
      }
    };

    ScrollTrigger.create({
      trigger: canvasRef.current,
      // start: "top top",
      start: getStart(),
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
        scrollRef.current.style.opacity = newColorOpacityForScroll;
      },
      onLeave: () => {
        setContentVisible(true);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width, height, xsSize, logoSeqImg]);

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
          width={xsSize ? 1080 : 1920}
          height={xsSize ? 1920 : 1080}
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
              src="https://res.cloudinary.com/dlxpea208/image/upload/v1727772622/scroll_ula7ky.svg"
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
    </>
  );
};

export default LogoReveal;
