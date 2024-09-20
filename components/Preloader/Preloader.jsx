"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.css";
import { useAnimeContext } from "@/context/animeContext";
import MouseFollower from "mouse-follower";
import gsap from "gsap";

MouseFollower.registerGSAP(gsap);

const Preloader = () => {
  const { showWebsite } = useAnimeContext();
  const [counter, setCounter] = useState(0);
  const container = useRef(null);
  const stickyMask = useRef(null);

  const initialMaskSize = 0.1; // Initial size of the mask
  const targetMaskSize = 8000; // Target size when the animation completes

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";

    const cursor = new MouseFollower({
      speed: 0.8,
      className: "mf-cursor",
      ease: "expo.out",
      skewing: 0,
    });

    // Counter increment logic
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 100) {
          return prevCounter + 1;
        } else {
          clearInterval(interval);
          // Enable scroll once the counter reaches 100%
          document.body.style.overflow = "auto";

          // Trigger the mask size increase animation
          gsap.to(stickyMask.current, {
            webkitMaskSize: `${targetMaskSize}%`,
            duration: 4, // Adjust the duration as needed
            ease: "power4.inOut",
          });

          return 100;
        }
      });
    }, 30); // Adjust this value for faster/slower counting

    return () => {
      clearInterval(interval);
      cursor.destroy();
      // Cleanup: Enable scrolling when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main
      className={`main flex justify-center ${styles.preload}`}
      style={{
        opacity: counter === 100 ? 0 : 1,
        zIndex: 999999,
        position: counter === 100 ? "flex" : "fixed",
      }}
    >
      <div ref={container} className={styles.containerZ}>
        <div ref={stickyMask} className={styles.stickyMask}>
          <div className={styles.maskbg}></div>
        </div>
      </div>

      {/* Counter display */}
      <div
        style={{ opacity: counter === 100 ? 0 : 1 }}
        data-cursor="-inverse"
        className={`${styles.preloaderTimer}`}
      >
        {counter}
      </div>
    </main>
  );
};

export default Preloader;
