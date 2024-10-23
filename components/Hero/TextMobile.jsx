import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Hero.module.css";

const TextMobile = () => {
  const [showText, setShowText] = useState(false);
  const { scrollYProgress } = useScroll();

  const [scrollCount, setScrollCount] = useState(1);

  const scrollValue = useTransform(scrollYProgress, [0, 1], [1, 100]);

  useEffect(() => {
    return scrollValue.onChange((value) => setScrollCount(Math.round(value)));
  }, [scrollValue]);

  useEffect(() => {
    if (scrollCount >= 18 && scrollCount <= 20) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  }, [scrollCount]);

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
      y: "110%",
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 * i },
    }),
  };

  return (
    <motion.div className="w-full h-screen">
      {showText ? (
        <div className={`${styles.mobileHero}`}>
          <section className={`${styles.hero} w-full min-h-full`}>
            <div
              className={`${styles.heroContent} flex flex-col`}
              style={{
                transition: "opacity 1s ease-in-out",
              }}
            >
              <div className="w-full overflow-hidden">
                <motion.div
                  custom={1}
                  variants={revealMask}
                  initial="initial"
                  animate="animate"
                  key={1}
                  className={`${styles.heroSubTitle} text-left`}
                >
                  step into
                </motion.div>
              </div>

              {/* <h4 className={`${styles.heroSubTitle}  text-left`}>step into</h4> */}

              <div className={styles.containerText}>
                <div className="w-full overflow-hidden">
                  <motion.div
                    custom={2}
                    variants={revealMask}
                    initial="initial"
                    animate="animate"
                    key={2}
                    className={`${styles.heroTitle}  flex items-center`}
                  >
                    Excellence
                  </motion.div>
                </div>

                {/* <h1 className={`${styles.heroTitle}  flex items-center`}>
                  Excellence
                </h1> */}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className={`${styles.mobileHero}`}>
          <section className={`${styles.hero} w-full min-h-full`}>
            <div
              className={`${styles.heroContent} flex flex-col`}
              style={{
                transition: "opacity 1s ease-in-out",
              }}
            >
              <div className="w-full overflow-hidden">
                <motion.div
                  custom={1}
                  variants={unRevealMask}
                  initial="initial"
                  animate="animate"
                  key={1}
                  className={`${styles.heroSubTitle} text-left`}
                >
                  step into
                </motion.div>
              </div>

              {/* <h4 className={`${styles.heroSubTitle}  text-left`}>step into</h4> */}

              <div className={styles.containerText}>
                <div className="w-full overflow-hidden">
                  <motion.div
                    custom={2}
                    variants={unRevealMask}
                    initial="initial"
                    animate="animate"
                    key={2}
                    className={`${styles.heroTitle}  flex items-center`}
                  >
                    Excellence
                  </motion.div>
                </div>

                {/* <h1 className={`${styles.heroTitle}  flex items-center`}>
                  Excellence
                </h1> */}
              </div>
            </div>
          </section>
        </div>
      )}
    </motion.div>
  );
};

export default TextMobile;
