import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Lamarca.module.css";

const LaMarcaMobile = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Track scroll progress from 1 to 100
  const [scrollCount, setScrollCount] = useState(1);
  const scrollValue = useTransform(scrollYProgress, [0, 1], [1, 100]);

  useEffect(() => {
    return scrollValue.onChange((value) => setScrollCount(Math.round(value)));
  }, [scrollValue]);

  // Control when to show the content based on scroll count
  useEffect(() => {
    if (scrollCount >= 67 && scrollCount <= 70) {
      setContentVisible(true);
    } else {
      setContentVisible(false);
    }
  }, [scrollCount]);

  // Reveal animation for text and image using Framer Motion
  const revealMask = {
    initial: { y: "100%" },
    animate: (i) => ({
      y: "0%",
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 * i },
    }),
  };

  const unRevealMask = {
    initial: { y: "0%" },
    animate: (i) => ({
      y: "120%",
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 * i },
    }),
  };

  return (
    <motion.div className="w-full h-screen">
      {contentVisible ? (
        <div className={`${styles.mobileHero}`}>
          <section className={`${styles.hero} w-full min-h-full`}>
            <div
              className={`${styles.heroContent} flex flex-col`}
              style={{ transition: "opacity 1s ease-in-out" }}
            >
              <div className="w-full overflow-hidden">
                <motion.div
                  custom={1}
                  variants={revealMask}
                  initial="initial"
                  animate="animate"
                  className={`${styles.heroSubTitle} text-left`}
                >
                  introducing
                </motion.div>
              </div>

              <div className={styles.containerImage}>
                <div className="w-full overflow-hidden">
                  <motion.img
                    custom={2}
                    variants={revealMask}
                    initial="initial"
                    animate="animate"
                    src="https://res.cloudinary.com/detngwnov/image/upload/v1729762226/la_marca_italy_png_okn0kg_rq8yet.png"
                    alt="LaMarca"
                    className={styles.heroImage}
                  />
                </div>
              </div>

              <div className="w-full overflow-hidden">
                <motion.div
                  custom={3}
                  variants={revealMask}
                  initial="initial"
                  animate="animate"
                  className={`${styles.heroSubTitle2} text-right`}
                >
                  from the house of walkwise
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className={`${styles.mobileHero}`}>
          <section className={`${styles.hero} w-full min-h-full`}>
            <div
              className={`${styles.heroContent} flex flex-col`}
              style={{ transition: "opacity 1s ease-in-out" }}
            >
              <div className="w-full overflow-hidden">
                <motion.div
                  custom={1}
                  variants={unRevealMask}
                  initial="initial"
                  animate="animate"
                  className={`${styles.heroSubTitle} text-left`}
                >
                  introducing
                </motion.div>
              </div>

              <div className={styles.containerImage}>
                <div className="w-full overflow-hidden">
                  <motion.img
                    custom={2}
                    variants={unRevealMask}
                    initial="initial"
                    animate="animate"
                    src="https://res.cloudinary.com/detngwnov/image/upload/v1729762226/la_marca_italy_png_okn0kg_rq8yet.png"
                    alt="LaMarca"
                    className={styles.heroImage}
                  />
                </div>
              </div>

              <div className="w-full overflow-hidden">
                <motion.div
                  custom={3}
                  variants={unRevealMask}
                  initial="initial"
                  animate="animate"
                  className={`${styles.heroSubTitle2} text-right`}
                >
                  from the house of walkwise
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      )}
    </motion.div>
  );
};

export default LaMarcaMobile;
