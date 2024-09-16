import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import { logo } from "@/assets";
import Image from "next/image";
import Lenis from "lenis";

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
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="w-full h-screen text-white text-[20rem]">{item}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
