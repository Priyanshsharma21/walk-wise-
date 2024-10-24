import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useAnimeContext } from "@/context/animeContext";
import { useScroll, useTransform, motion } from "framer-motion";

const Navbar = () => {
  const { navRef } = useAnimeContext();
  const [contentVisible, setContentVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  const [scrollCount, setScrollCount] = useState(1);
  const scrollValue = useTransform(scrollYProgress, [0, 1], [1, 100]);

  useEffect(() => {
    return scrollValue.onChange((value) => setScrollCount(Math.round(value)));
  }, [scrollValue]);

  useEffect(() => {
    if (scrollCount >= 17 && scrollCount <= 92) {
      setContentVisible(true);
    } else {
      setContentVisible(false);
    }
  }, [scrollCount]);

  // Reveal animation for text and image using Framer Motion
  const revealMask = {
    initial: { y: "-100%" },
    animate: (i) => ({
      y: "0%",
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 * i },
    }),
  };

  const unRevealMask = {
    initial: { y: "0%" },
    animate: (i) => ({
      y: "-120%",
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 * i },
    }),
  };

  return (
    <nav
      ref={navRef}
      style={{ zIndex: 9 }}
      className={`${styles.navbar} w-full flex flex-col justify-between fixed top-0`}
    >
      {contentVisible ? (
        <div className="w-full overflow-hidden">
          <motion.div
            custom={1}
            variants={revealMask}
            initial="initial"
            animate="animate"
            className={`${styles.navTop} flex justify-between items-center`}
          >
            <img
              src={`https://res.cloudinary.com/detngwnov/image/upload/v1729761899/LOGO_yws94a.png`}
              alt="logo"
              className={styles.navLogo}
            />
          </motion.div>
        </div>
      ) : (
        <div className="w-full overflow-hidden">
          <motion.div
            custom={1}
            variants={unRevealMask}
            initial="initial"
            animate="animate"
            className={`${styles.navTop} flex justify-between items-center`}
          >
            <img
              src={`https://res.cloudinary.com/detngwnov/image/upload/v1729761899/LOGO_yws94a.png`}
              alt="logo"
              className={styles.navLogo}
            />
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
