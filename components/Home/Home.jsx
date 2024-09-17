import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import { logo } from "@/assets";
import Image from "next/image";
import Lenis from "lenis";
import Hero from "../Hero/Hero";
import Introduction from "../Introduction/Introduction";
import Video from "../Video/Video";
import Demo from "../Demo/Demo";

const Home = () => {
  // useEffect(() => {
  //   const lenis = new Lenis({ lerp: "0.07" });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);
  return (
    <div className={`w-full h-screen ${styles.home}`}>
      <div className={styles.invertedDiv}>
        <div className={`logo`}>
          <Image src={logo} className={`${styles.logo}`} />
        </div>
      </div>
      <div className="w-full">
        <Hero />
        <Demo
          numFrames={393}
          width={window.innerWidth}
          height={window.innerHeight}
          initialWidth={1920}
          initialHeight={1080}
        />
        <Introduction />
        <Video />
      </div>
    </div>
  );
};

export default Home;
