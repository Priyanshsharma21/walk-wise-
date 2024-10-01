import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Gallary.module.css";
import { pilot, prestige, prime } from "@/constants";
import { useAnimeContext } from "@/context/animeContext";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const Gallary = ({
  width,
  height,
  initialWidth,
  initialHeight,
  data,
  heightBelow,
  isActive,
  setActive,
}) => {
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);
  const primeTextRef = useRef(null);
  const primeTextBoxRef = useRef(null);
  const galleryRef = useRef(null);
  const descriptionRef = useRef(null); // Reference for description animation
  const { showBtn, setShowBtn } = useAnimeContext();
  const [showTitle, setShowTitle] = useState(false);
  console.log(showTitle);

  const [canvasSize, setCanvasSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      const loadedImages = [];
      const batchSize = 50;

      for (let i = 0; i < data["imgSequence"].length; i += batchSize) {
        const batch = data["imgSequence"].slice(i, i + batchSize);
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
    const ctx = canvasRef.current.getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    ScrollTrigger.create({
      trigger: canvasRef.current,
      start: "top top",
      end: `+=${height}`,
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const index = Math.min(
          data["imgSequence"].length - 1,
          Math.ceil(progress * data["imgSequence"].length)
        );
        setFrameIndex(index);

        if (index >= 2) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }

        console.log(index);

        if (index > 0 && index <= 110) {
          gsap.to(primeTextBoxRef.current, { opacity: 1, duration: 1 });

          // Animate description on scroll
          if (descriptionRef.current) {
            gsap.to(descriptionRef.current.children, {
              opacity: 1,
              stagger: 0.1, // Word by word animation
              ease: "power1.out",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top +=500", // Adjust based on when you want it to start
                end: "bottom bottom-=100",
                scrub: true,
              },
            });
          }
        } else {
          gsap.to(primeTextBoxRef.current, { opacity: 0, duration: 1 });
        }

        if (index >= 26 && index <= 96) {
          setShowTitle(true);
          if (data.title === "Pilot") {
            setActive(1);
          } else if (data.title === "Prime") {
            setActive(2);
          } else {
            setActive(3);
          }
          gsap.to(primeTextRef.current, { opacity: 1, duration: 1 });
        } else {
          gsap.to(primeTextRef.current, { opacity: 0, duration: 1 });
          setShowTitle(false);
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width, height]);

  // GSAP Image Sequence Animation
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
    initial: { x: "100%" }, // Start from the right side
    animate: (i) => ({
      x: "0%", // Animate back to the initial position (from the right to left)
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0 }, // No delay
    }),
  };

  const revealMask2 = {
    initial: { y: "100%" },
    animate: (i) => ({
      y: "0%",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.02 * i },
    }),
  };

  return (
    <div ref={galleryRef}>
      <div className={`relative`} style={{ height: "100vh", width: "100%" }}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={1920}
          height={1080}
        />

        <div
          className={styles.primeText}
          style={{
            top: "45%",
            left: data.title === "Prestige" ? "34%" : "44%",
          }}
        >
          {showTitle && (
            <div className="w-full overflow-hidden">
              <motion.div
                ref={primeTextRef}
                custom={1}
                variants={revealMask}
                initial="initial"
                animate="animate"
                // style={{
                //   opacity: 0,
                // }}
              >
                <motion.div>{data.title}</motion.div>
              </motion.div>
            </div>
          )}
        </div>
        <div
          className={styles.buttonContainer}
          style={{ opacity: showBtn ? 1 : 0 }}
        >
          <img
            src={isActive === 1 ? pilot.activeImg.on : pilot.activeImg.off}
            alt={data.title}
            className={styles.gallaryImg}
          />
          <img
            src={isActive === 2 ? prime.activeImg.on : prime.activeImg.off}
            alt={data.title}
            className={styles.gallaryImg}
          />
          <img
            src={
              isActive === 3 ? prestige.activeImg.on : prestige.activeImg.off
            }
            alt={data.title}
            className={styles.gallaryImg}
          />
        </div>

        {showTitle && (
          <div
            className={styles.gallarySubtitleBox}
            ref={primeTextBoxRef}
            style={{ opacity: 0 }}
          >
            <div
              ref={descriptionRef}
              className={`${styles.gallarySubtitle} flex`}
            >
              {data.description.split(" ").map((word, i) => (
                <div
                  className="w-auto overflow-hidden flex justify-center"
                  key={i}
                >
                  <motion.div
                    custom={i + 1}
                    variants={revealMask2}
                    initial="initial"
                    animate="animate"
                    className={`${styles.heroTitle} w-auto text-white ml-[0.6em] flex items-center`}
                  >
                    <motion.div>{word}</motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={`w-full h-[${heightBelow}]`} />
    </div>
  );
};

export default Gallary;
