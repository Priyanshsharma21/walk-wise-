import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${styles.hero}`}
    >
      Hero
    </div>
  );
};

export default Hero;
