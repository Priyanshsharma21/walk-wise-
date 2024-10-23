"use client";
import React, { useEffect, useState } from "react";
import styles from "./Preloader.module.css";
import { useAnimeContext } from "@/context/animeContext";

const Preloader = () => {
  const {
    setShowWebsite,
    setIsLoaderCompleted,
    isLoaderCompleted,
    showWebsite,
  } = useAnimeContext();
  const [counter, setCounter] = useState(0);
  const [hidePreloader, setHidePreloader] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable body scroll during preloader

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 111) {
          return prevCounter + 1;
        } else {
          clearInterval(interval);
          document.body.style.overflow = "auto"; // Enable body scrolling when counter hits 111
          setIsLoaderCompleted(true); // Mark loader as completed
          return 111;
        }
      });
    }, 30);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto"; // Clean up on component unmount
    };
  }, [setIsLoaderCompleted]);

  // Effect to handle the preloader fade-out
  useEffect(() => {
    if (showWebsite && isLoaderCompleted) {
      // Fade out preloader
      const timeout = setTimeout(() => {
        setHidePreloader(true); // Set to true to hide the preloader after fade-out
      }, 1000); // Delay for opacity transition

      return () => clearTimeout(timeout);
    }
  }, [showWebsite, isLoaderCompleted]);

  return (
    <main
      className={`main flex justify-center items-center ${styles.preload}`}
      style={{
        opacity: showWebsite && !isLoaderCompleted ? 1 : hidePreloader ? 0 : 1, // Fade-out effect
        transition: "opacity 1s ease", // Smooth fade-out
        zIndex: hidePreloader ? -1 : 999999, // Lower z-index when hidden
        display: hidePreloader ? "none" : "fixed", // Hide after fade-out
        position: isLoaderCompleted && hidePreloader ? "relative" : "fixed", // Relative position after hiding
      }}
    >
      <div>
        <div className={styles.loaderWrapper}>
          <div data-cursor="-inverse" className={styles.spinner}>
            {Array.from({ length: 10 }).map((_, index) => {
              const adjustedIndex = (index + 6) % 10;

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
