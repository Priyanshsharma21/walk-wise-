import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useAnimeContext } from "@/context/animeContext";
import React from "react";
import styles from "./IntroductionMobile.module.css";
import { infoData, introductionText, shoeEntryImgMobile } from "@/constants";
import { Col, Row } from "antd";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

const IntroductionMobile = ({ width, height, initialWidth, initialHeight }) => {
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

  const [showMainContent, setShowMainContent] = useState(false);

  const [showBottomText, setShowBottomText] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];
      const batchSize = 50;

      for (let i = 0; i < shoeEntryImgMobile.length; i += batchSize) {
        const batch = shoeEntryImgMobile.slice(i, i + batchSize);
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
          shoeEntryImgMobile.length - 1,
          Math.ceil(progress * shoeEntryImgMobile.length)
        );
        setFrameIndex(index);

        if (index >= 1 && index <= 205) {
          setShowMainContent(true);
        } else {
          setShowMainContent(false);
        }

        if (index >= 0 && index <= 205) {
          gsap.to(sectionRef.current, { opacity: 1, duration: 0.1 });
        } else {
          gsap.to(sectionRef.current, { opacity: 0, duration: 1 });
        }

        if (index >= 70 && index <= 205) {
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

  const unRevealMask = {
    initial: { y: "0%" },
    animate: (i) => ({
      y: "100%",
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
          width={initialWidth}
          height={initialHeight}
          className={styles.canvas}
        />
      </div>

      <div className={styles.introduction}>
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
              {showMainContent ? (
                <>
                  {infoData.map((data, i) => (
                    <div
                      className={`flex flex-col ${
                        showMainContent ? styles.iCol1 : ""
                      } justify-center`}
                    >
                      <div className="w-full overflow-hidden">
                        <motion.div
                          custom={i}
                          variants={revealMask}
                          initial="initial"
                          animate="animate"
                          key={i}
                          className={`${styles.iSubhead} pb-8 text-right`}
                        >
                          {data}
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {infoData.map((data, i) => (
                    <div
                      className={`flex flex-col ${
                        showMainContent ? styles.iCol1 : ""
                      } justify-center`}
                    >
                      <div className="w-full overflow-hidden">
                        <motion.div
                          custom={i}
                          variants={unRevealMask}
                          initial="initial"
                          animate="animate"
                          key={i}
                          className={`${styles.iSubhead} pb-8 text-right`}
                        >
                          {data}
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </>
              )}
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

export default IntroductionMobile;
