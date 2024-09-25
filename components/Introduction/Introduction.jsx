import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useAnimeContext } from "@/context/animeContext";
import React from "react";
import styles from "./Introduction.module.css";
import { infoData, shoeEntryImg } from "@/constants";
import { Col, Row } from "antd";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Introduction = () => {
  const { setPageCount } = useAnimeContext();
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const subheadRefs = useRef([]);
  const comfortRef = useRef(null);
  const stepIntoRef = useRef(null);
  const zoneRef = useRef(null);
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);
  const imageSequenceRef = useRef(null);

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
  }, []);

  useEffect(() => {
    const element = sectionRef.current;

    // Set initial opacity of subhead elements to 0.1
    gsap.set(subheadRefs.current, { opacity: 0.1 });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 7%",
      end: "+=300%",
      onEnter: () => setPageCount(2),
      onLeaveBack: () => setPageCount(1),
      pin: true,
      scrub: 1,
    });

    // Animation for each subhead element with stagger
    gsap.to(subheadRefs.current, {
      opacity: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: element,
        start: "top 50%",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setPageCount]);

  useEffect(() => {
    // Initial setup for SplitText for the comfortRef (if needed for character splitting)
    const splitComfortText = new SplitText(comfortRef.current, {
      type: "chars",
    });
    const chars = splitComfortText.chars;

    // Create the timeline
    gsap
      .timeline({
        scrollTrigger: {
          trigger: heroRef.current, // Element to trigger the animation
          start: "top top", // Start of the animation when the element hits the top of the viewport
          end: "+=400", // End after scrolling 1000px
          scrub: true, // Sync animation with the scroll
          ease: "power1.inOut",
        },
      })
      // Step 1: Bring all elements onto the screen at once
      .fromTo(
        [stepIntoRef.current, comfortRef.current, zoneRef.current],
        { opacity: 0 }, // Initial state: all are invisible
        { opacity: 1, duration: 1, ease: "power1.out" } // All fade in together
      )
      .fromTo(
        chars,
        { x: -100, visibility: "none" },
        {
          x: 0,
          visibility: "visible",
          stagger: 0.03,
          duration: 1,
          ease: "power4.inOut",
          scrub: true,
        }
      )
      // Step 2: Apply movement animations for stepIntoRef and zoneRef
      .fromTo(
        stepIntoRef.current,
        { y: 50 }, // Starts from below
        { y: 0, duration: 1, ease: "power1.out" }, // Moves to its final position
        0 // Start at the same time
      )
      .fromTo(
        zoneRef.current,
        { y: -50 }, // Starts from above
        { y: 0, duration: 1, ease: "power1.out" }, // Moves to its final position
        0 // Start at the same time
      );
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

  useEffect(() => {
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
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
            <Col xl={9} lg={9} md={24} sm={24} xm={24}>
              <div className={`flex flex-col ${styles.iCol1} justify-center`}>
                {infoData.map((data, i) => (
                  <div
                    key={i}
                    className={`${styles.iSubhead} pb-8 text-right`}
                    ref={(el) => (subheadRefs.current[i] = el)} // Collect refs
                  >
                    {data}
                  </div>
                ))}
              </div>
            </Col>
            <Col xl={15} lg={15} md={24} sm={24} xm={24}></Col>
          </Row>

          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <section
                className={`${styles.hero} w-full min-h-full flex justify-end`}
                ref={heroRef}
              >
                <div className={`${styles.heroContent} flex flex-col`}>
                  <h4
                    ref={stepIntoRef}
                    className={`${styles.heroSubTitle} text-6xl text-white text-left`}
                    style={{ opacity: 0 }}
                  >
                    have the
                  </h4>

                  <h1
                    className={`${styles.heroTitle} text-6xl text-white flex items-center`}
                    ref={comfortRef}
                  >
                    world
                  </h1>

                  <h4
                    ref={zoneRef}
                    className={`${styles.heroSubTitle2} text-6xl text-white text-right`}
                    style={{ opacity: 0 }}
                  >
                    at your feet
                  </h4>
                </div>
              </section>
            </Col>
          </Row>
        </main>
        <div className="w-full h-[300vh]" />
      </div>
    </>
  );
};

export default Introduction;
