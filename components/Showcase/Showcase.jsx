import React, { useRef, useState } from "react";
import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { videoSectionData } from "@/constants";
import styles from "./Showcase.module.css";

const Showcase = () => {
  const [title, setTitle] = useState(videoSectionData[0].title);
  const [subTitle, setSubTitle] = useState(videoSectionData[0].subtitle);

  const processRef = useRef(null);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  const handleInView = (card) => {
    setTitle(card.title);
    setSubTitle(card.subtitle);
  };

  return (
    <div
      id="process"
      ref={processRef}
      className="w-full min-h-[100vh] text-white"
    >
      <div className="w-full h-[50vh]" />

      <section ref={targetRef} className="relative h-[300vh] scrolling_box">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden processbg">
          <motion.div style={{ x }} className="flex c-process-cont">
            {videoSectionData.map((card) => (
              <Card key={card.id} card={card} handleInView={handleInView} />
            ))}
          </motion.div>

          <div
            className={`absolute left-0 top-0 h-full w-[40vw] flex items-center justify-center ${styles.videoLeftSide}`}
          >
            <div className="flex flex-col justify-center items-center">
              <div className={styles.videoTitle}>{title}</div>
              <div className={styles.videoSubtitleBox}>
                <div className={styles.videoSubtitle}>{subTitle}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Card = ({ card, handleInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 }); // Detect when card is at the center of the screen

  // When the card is in view, update the title and subtitle
  if (isInView) {
    handleInView(card);
  }

  return (
    <div
      ref={ref}
      style={{ marginLeft: card.id === 0 ? "30vw" : "0px" }}
      className={`${styles.cardContainer} group sticky left-0 videoCardMain`}
    >
      <div className="w-[100vw]">
        <video
          preload="preload"
          poster={card.poster}
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover"
        >
          <source src={card.videoUrl} />
        </video>
      </div>
    </div>
  );
};

export default Showcase;
