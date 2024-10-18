import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useAnimeContext } from "@/context/animeContext";
import React from "react";
import styles from "./Introduction.module.css";
import { infoData, introductionText, shoeEntryImg } from "@/constants";
import { Col, Row } from "antd";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Introduction = ({ width, height, initialWidth, initialHeight }) => {
  const { setPageCount } = useAnimeContext();
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const subheadRefs = useRef([]);
  const stepIntoRef = useRef(null);
  const zoneRef = useRef(null);
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);
  const imageSequenceRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const [showBottomText, setShowBottomText] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];
      const batchSize = 50;

      for (let i = 0; i < shoeEntryImg.length; i += batchSize) {
        const batch = shoeEntryImg.slice(i, i + batchSize);
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

    ScrollTrigger.create({
      trigger: canvasRef.current,
      start: "top top",
      end: "+=470%",
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const index = Math.min(
          shoeEntryImg.length - 1,
          Math.ceil(progress * shoeEntryImg.length)
        );
        setFrameIndex(index);

        if (index >= 0 && index <= 469) {
          gsap.to(sectionRef.current, { opacity: 1, duration: 0.1 });
        } else {
          gsap.to(sectionRef.current, { opacity: 0, duration: 1 });
        }

        if (index >= 346 && index <= 469) {
          setShowBottomText(true);
          gsap.to(heroRef.current, { opacity: 1, duration: 1 });
        } else {
          setShowBottomText(false);
          gsap.to(heroRef.current, { opacity: 0, duration: 1 });
          gsap.to(sectionRef.current, { opacity: 0, duration: 1 });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [width, height]);

  useEffect(() => {
    const element = sectionRef.current;

    subheadRefs.current.forEach((subhead) => {
      gsap.set(subhead.querySelectorAll(".char-span"), { opacity: 0.1 });
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 7%", // Adjust the start position
      end: "+=350%", // Shorten the animation range to make it faster
      onEnter: () => setPageCount(2),
      onLeaveBack: () => setPageCount(1),
      pin: true,
      scrub: 1, // Controls the animation speed during scroll
    });

    subheadRefs.current.forEach((subhead) => {
      gsap.to(subhead.querySelectorAll(".char-span"), {
        opacity: 1,
        stagger: 0.7, // Faster stagger for quicker animation
        duration: 0.5, // Adjust the duration to be quicker
        scrollTrigger: {
          trigger: element,
          start: "top 10%", // Adjust to start sooner
          end: "bottom +=200%",
          scrub: 1, // Smooth scroll-based animation
        },
      });
    });

    return () => {
      trigger.kill();
    };
  }, [setPageCount]);

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

  const revealMask = {
    initial: { y: "100%" },
    animate: (i) => ({
      y: "0%",
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 * i },
    }),
  };

  return (
    <>
      <div
        className={`relative`}
        style={{ height: "100vh", width: "100%", zIndex: 9999999999999 }}
        ref={imageSequenceRef}
      >
        <canvas
          ref={canvasRef}
          style={{ mixBlendMode: "lighten" }}
          width={1920}
          height={1080}
          className={styles.canvas}
        />
      </div>

      <div ref={sectionRef} className={styles.introduction}>
        <main className={`${styles.info} w-full h-screen`}>
          <Row>
            <Col
              xl={9}
              lg={9}
              md={24}
              sm={24}
              xm={24}
              className={styles.introCol1}
            >
              <div className={`flex flex-col ${styles.iCol1} justify-center`}>
                {infoData.map((data, i) => (
                  <div
                    key={i}
                    className={`${styles.iSubhead} pb-8 text-right`}
                    ref={(el) => (subheadRefs.current[i] = el)}
                  >
                    {data.split("").map((char, charIndex) => (
                      <span key={charIndex} className="char-span">
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </Col>
            <Col xl={15} lg={15} md={0} sm={0} xm={0}></Col>
          </Row>
        </main>

        <section
          className={`${styles.hero} w-full min-h-full`}
          ref={heroRef}
          style={{
            background: showBottomText
              ? "linear-gradient(to right, #710071, transparent)"
              : "",
          }}
        >
          {showBottomText && (
            <div className={`${styles.heroContent} flex flex-col`}>
              <motion.div
                whileInView={{
                  x: [-100, -50, 0],
                  opacity: [0, 0, 1],
                }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h4
                  ref={stepIntoRef}
                  className={`${styles.heroSubTitle}  text-left`}
                >
                  have the
                </h4>
              </motion.div>

              <div className={`flex ${styles.introBigWord}`}>
                {introductionText[1].split("").map((word, i) => (
                  <div
                    className="w-auto overflow-hidden flex justify-center"
                    key={i}
                  >
                    <motion.div
                      custom={i + 1}
                      variants={revealMask}
                      initial="initial"
                      animate="animate"
                      className={`${styles.heroTitle} w-auto  flex items-center`}
                    >
                      <motion.div>{word}</motion.div>
                    </motion.div>
                  </div>
                ))}
              </div>

              <motion.div
                whileInView={{
                  x: [100, 50, 0],
                  opacity: [0, 0, 1],
                }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h4
                  ref={zoneRef}
                  className={`${styles.heroSubTitle2} text-right`}
                >
                  at your feet
                </h4>
              </motion.div>
            </div>
          )}
        </section>
        <div className="w-full h-[350vh]" />
      </div>
    </>
  );
};

export default Introduction;
