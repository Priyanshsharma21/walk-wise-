import React from "react";
import styles from "./Website.module.css";
import Navbar from "../Navbar/Navbar";

const Website = () => {
  return (
    <section className={styles.website}>
      {/* Background gradients */}
      <div className={styles.gradientBackground}></div>

      {/* Glass layer */}
      <div className={styles.glassLayer}></div>

      {/* Scrolling content */}
      <div className={styles.content}>
        <Navbar />
        <div className="w-full h-screen flex justify-center items-center">
          Hello
        </div>
        <div className="w-full h-screen flex justify-center items-center">
          Hello
        </div>
      </div>
    </section>
  );
};

export default Website;
