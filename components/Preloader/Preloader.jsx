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

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";

    const cursor = new MouseFollower({
      speed: 0.8,
      className: "mf-cursor",
      ease: "expo.out",
      skewing: 0,
    });

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 100) {
          return prevCounter + 1;
        } else {
          clearInterval(interval);
          // Enable scroll once the counter reaches 100%
          document.body.style.overflow = "auto";
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

  // const initialMaskSize = 0.8;
  // const targetMaskSize = 30;
  // const easing = 0.15;
  // let easedScrollProgress = 0;

  // useEffect(() => {
  //   requestAnimationFrame(animate);
  // }, []);

  // const animate = () => {
  //   const maskSizeProgress = targetMaskSize * getScrollProgress();
  //   stickyMask.current.style.webkitMaskSize =
  //     (initialMaskSize + maskSizeProgress) * 100 + "%";
  //   requestAnimationFrame(animate);
  // };

  // const getScrollProgress = () => {
  //   const scrollProgress =
  //     stickyMask.current.offsetTop /
  //     (container.current.getBoundingClientRect().height - window.innerHeight);
  //   const delta = scrollProgress - easedScrollProgress;
  //   easedScrollProgress += delta * easing;
  //   return easedScrollProgress;
  // };

  return (
    <div
      // style={{ opacity: showWebsite ? 0 : 1, zIndex: 999999 }}
      className={`${styles.preloader} w-full h-screen fixed overflow-clip flex justify-center items-center`}
    >
      <div className={styles.stickyMask}>
        <div className="w-full h-screen bg-[#370037]"></div>
      </div>
      <div
        style={{ opacity: counter === 100 ? 0 : 1 }}
        data-cursor="-inverse"
        className={`${styles.preloaderTimer}`}
      >
        {counter}%
      </div>
    </div>
  );
};

export default Preloader;
