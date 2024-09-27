import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { videoSectionData } from "@/constants";
import styles from "./VideoShow.module.css";

const VideoShow = () => {
  const processRef = useRef(null);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <div
      id="process"
      ref={processRef}
      className="w-full min-h-[100vh] text-white"
    >
      <div className="w-full h-[50vh]" />

      <section ref={targetRef} className="relative h-[300vh] scrolling_box">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden processbg">
          <motion.div style={{ x }} className="flex gap-4 c-process-cont">
            {videoSectionData.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </motion.div>
        </div>
      </section>

      <div className="w-full h-screen flex justify-center items-center">
        Showcase section
      </div>
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <div
      className={`${styles.cardContainer} group ml-[2rem] rounded-xl relative videoCardMain overflow-hidden`}
    >
      <div className={styles.videoContainer}>
        {/* Title Animation */}
        <motion.div className={styles.cardTitle}>
          {card.title.split("").map((char, index) => (
            <motion.span
              key={index}
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.03,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className={styles.cardVideoMain}
        >
          <video
            preload="preload"
            poster={card.poster}
            muted
            playsInline
            loop
            autoPlay
            className={styles.videoMain}
          >
            <source src={card.videoUrl} />
          </video>
        </motion.div>

        {/* Subtitle Animation */}
        <motion.div className={styles.cardSubTitle}>
          {card.subtitle.split(" ").map((word, index) => (
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.01, // Word by word animation effect
              }}
              key={index}
              style={{ display: "inline-block", marginRight: "0.3em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default VideoShow;
