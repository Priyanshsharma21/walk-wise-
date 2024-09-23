"use client";
import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.css";
import { useAnimeContext } from "@/context/animeContext";

const Preloader = () => {
  const { setShowWebsite } = useAnimeContext();
  const [counter, setCounter] = useState(0);
  const [hidePreloader, setHidePreloader] = useState(false);

  useEffect(() => {
    // Disable body scrolling during preloader
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 100) {
          return prevCounter + 1;
        } else {
          clearInterval(interval);
          document.body.style.overflow = "auto"; // Enable body scrolling when counter hits 100

          setShowWebsite(true);
          setHidePreloader(true);

          return 100;
        }
      });
    }, 30); // Adjust interval time as needed

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto"; // Clean up on component unmount
    };
  }, [setShowWebsite]);

  return (
    <main
      className={`main flex justify-center items-center ${styles.preload}`}
      style={{
        opacity: counter === 100 ? 0 : 1,
        zIndex: hidePreloader ? -1 : 999999,
        display: hidePreloader ? "none" : "fixed",
        position: counter === 100 ? "relative" : "fixed",
      }}
    >
      <div>
        <div className={styles.loaderWrapper}>
          <div data-cursor="-inverse" className={styles.spinner}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={styles.spinnerDiv}
                style={{
                  opacity: counter >= (index + 1) * 10 ? 1 : 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Preloader;

{
  /* <div
        style={{ opacity: counter === 100 ? 0 : 1 }}
        data-cursor="-inverse"
        className={`${styles.preloaderTimer}`}
      >
        {counter}
      </div> */
}
