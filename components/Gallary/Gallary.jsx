import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallaryImgSeq } from "../../constants"; // Assuming your image array is in this location
import styles from "./Gallary.module.css"; // Add styles as needed

gsap.registerPlugin(ScrollTrigger);

const Gallary = () => {
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const canvasRef = useRef(null);
  const primeTextRef = useRef(null); // Reference for "Prime" text
  const primeTextBoxRef = useRef(null); // Reference for "Prime" text

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      const loadedImages = [];
      const batchSize = 50;

      for (let i = 0; i < gallaryImgSeq.length; i += batchSize) {
        const batch = gallaryImgSeq.slice(i, i + batchSize);
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
    ScrollTrigger.create({
      trigger: canvasRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const index = Math.min(
          gallaryImgSeq.length - 1,
          Math.ceil(progress * gallaryImgSeq.length)
        );
        setFrameIndex(index);

        // Show "Prime" text when index is between 46 and 76
        if (index >= 36 && index <= 76) {
          gsap.to(primeTextRef.current, { opacity: 1, duration: 1 });
          gsap.to(primeTextBoxRef.current, { opacity: 1, duration: 1 });
        } else {
          gsap.to(primeTextRef.current, { opacity: 0, duration: 1 });
          gsap.to(primeTextBoxRef.current, { opacity: 0, duration: 1 });
        }
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

  return (
    <div>
      <div className={`relative`} style={{ height: "100vh", width: "100%" }}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={1920}
          height={1080}
        />
        {/* Prime Text */}
        <div
          ref={primeTextRef}
          className={styles.primeText}
          style={{
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0, // Initial opacity set to 0 for fade-in
          }}
        >
          Prime
        </div>

        <div
          className={styles.gallarySubtitleBox}
          ref={primeTextBoxRef}
          style={{ opacity: 0 }}
        >
          <div className={styles.gallarySubtitle}>
            High quality craftsmanship meets meticulous workmanship
          </div>
        </div>
      </div>
      <div className="w-full h-[250vh]" />
    </div>
  );
};

export default Gallary;
