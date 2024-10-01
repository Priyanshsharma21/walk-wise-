"use client";
import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.css";
import { useAnimeContext } from "@/context/animeContext";

const Preloader = () => {
  const { setShowWebsite, setIsLoaderCompleted, isLoaderCompleted } =
    useAnimeContext();
  const [counter, setCounter] = useState(0);
  const [hidePreloader, setHidePreloader] = useState(false);

  useEffect(() => {
    // Disable body scrolling during preloader
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 111) {
          return prevCounter + 1;
        } else {
          clearInterval(interval);
          document.body.style.overflow = "auto"; // Enable body scrolling when counter hits 111

          setHidePreloader(true);
          setIsLoaderCompleted(true);

          return 111;
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
        opacity: isLoaderCompleted === true ? 0 : 1,
        zIndex: hidePreloader ? -1 : 999999,
        display: hidePreloader ? "none" : "fixed",
        position: isLoaderCompleted === true ? "relative" : "fixed",
      }}
    >
      <div>
        <div className={styles.loaderWrapper}>
          <div data-cursor="-inverse" className={styles.spinner}>
            {Array.from({ length: 10 }).map((_, index) => {
              // Modify the opacity to start from the top
              // The order is changed so the opacity changes in clockwise order starting from the top
              const adjustedIndex = (index + 6) % 10; // Adjust the index to start from the top

              return (
                <div
                  key={index}
                  className={styles.spinnerDiv}
                  style={{
                    opacity: counter >= (adjustedIndex + 1) * 10 ? 1 : 0.1,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.glassLayer}></div>
    </main>
  );
};

export default Preloader;
