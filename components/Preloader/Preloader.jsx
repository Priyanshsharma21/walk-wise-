"use client";
import React, { useEffect } from "react";
import styles from "./Preloader.module.css";
import { useAnimeContext } from "@/context/animeContext";
import MouseFollower from "mouse-follower";
import gsap from "gsap";

MouseFollower.registerGSAP(gsap);

const Preloader = () => {
  const { showWebsite } = useAnimeContext();

  useEffect(() => {
    const cursor = new MouseFollower({
      speed: 0.8,
      className: "mf-cursor",
      ease: "expo.out",
      skewing: 0,
    });

    return () => {
      cursor.destroy();
    };
  }, []);

  return (
    <div
      style={{ opacity: showWebsite ? 0 : 1, zIndex: 999999 }}
      className={`${styles.preloader} w-full h-screen fixed  overflow-clip flex justify-center items-center`}
    >
      <div>
        <div className={styles.loaderWrapper}>
          <div data-cursor="-inverse" className={styles.spinner}>
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
            <div className={styles.spinnerDiv} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
