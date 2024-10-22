import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { motion, useTransform, useScroll } from "framer-motion";
import { videoSectionData } from "@/constants";
import styles from "./MobileShow.module.css";
import { useAnimeContext } from "@/context/animeContext";
import { Divider } from "antd";

gsap.registerPlugin(ScrollTrigger);

const MobileShow = () => {
  const containerRef = useRef(null);
  const thumbnailRefs = useRef([]);
  const videoLeftSideRef = useRef(null); // Ref for the animated box
  const [title, setTitle] = useState(videoSectionData[0].title);
  const [index, setIndex] = useState(videoSectionData[0].id);
  const [title2, setTitle2] = useState(videoSectionData[0].title2);
  const [subTitle, setSubTitle] = useState(videoSectionData[0].subtitle);
  const [backgroundLeft, setBackgroundLeft] = useState(
    videoSectionData[0].background
  );
  const [contentVisible, setContentVisible] = useState(false); // New state for visibility
  const {
    isMobile,
    xsSize,
    setContentVisible: isContentVisible,
  } = useAnimeContext();

  const subtitleRef = useRef(null);
  const processRef = useRef(null);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline({
      scrollTrigger: {
        trigger: processRef.current,
        start: "top 50%", // Trigger when the user scrolls to the section
        end: "bottom 100%", // End when the user scrolls past the section
        scrub: true,
        pinSpacing: false,
        onUpdate: (self) => {
          const index = Math.round(
            self.progress * (videoSectionData.length - 1)
          );
          setTitle(videoSectionData[index].title);
          setSubTitle(videoSectionData[index].subtitle);
          setTitle2(videoSectionData[index].title2);
          setBackgroundLeft(videoSectionData[index].background);
          setIndex(videoSectionData[index].id);
          isContentVisible(true);
        },
        onEnter: () => setContentVisible(true), // Set contentVisible to true when entering
        onLeave: () => setContentVisible(false), // Set contentVisible to false when leaving
        onEnterBack: () => setContentVisible(true), // Set contentVisible to true when re-entering
        onLeaveBack: () => setContentVisible(false), // Set contentVisible to false when leaving back
      },
    });
  }, []);

  useEffect(() => {
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current.children,
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        }
      );
    }
  }, [subTitle]);

  useEffect(() => {
    if (videoLeftSideRef.current && xsSize) {
      gsap.fromTo(
        videoLeftSideRef.current,
        { x: "-200%", filter: "blur(5px)" }, // Start from off-screen bottom
        {
          x: "0%", // Move to initial position
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }
  }, [title, xsSize]); // Trigger animation whenever the title changes

  const revealMask = {
    initial: { y: "100%" },
    animate: (i) => ({
      y: "0%",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.2 * i },
    }),
  };

  return (
    <div
      id="process"
      ref={processRef}
      className={`w-full min-h-[100vh] bg-[#141414] text-white ${styles.processMain}`}
    >
      <section
        ref={targetRef}
        className="relative h-[300vh] scrolling_box bg-[#12121218]"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden processbg">
          <motion.div style={{ x }} className="flex c-process-cont">
            {videoSectionData.map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </motion.div>
        </div>
      </section>

      {contentVisible && (
        <motion.div
          initial={{ opacity: 0 }} // Initial opacity
          animate={{ opacity: 1 }} // Animate to opacity 1
          transition={{ duration: 1 }} // Duration of the animation
          ref={videoLeftSideRef} // Ref for the box to animate
          style={{
            background: isMobile
              ? backgroundLeft.mobile
              : backgroundLeft.desktop,
          }}
          className={`${styles.videoLeftSide}`}
        >
          <div
            className={`${styles.videoCard} flex flex-col justify-around items-center w-full h-full`}
          >
            <div>
              {title2.map((title, i) => (
                <div
                  key={`${title}-${index}`} // Unique key for re-triggering animation
                  className={`${styles.videoHead} w-full overflow-hidden video-${i}-${index}`}
                >
                  <motion.div
                    custom={i + 1}
                    variants={revealMask}
                    initial="initial"
                    animate="animate"
                    key={`${title}-${i}-${index}`} // Important: changes every time
                  >
                    <motion.div>{title}</motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
            <Divider className={styles.showcaseDivider} />
            <div className={styles.videoSubtitleBox}>
              <div ref={subtitleRef} className={styles.videoSubtitle}>
                {subTitle.split(" ").map((word, index) => (
                  <span key={index} className={styles.word}>
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.srno}
      className={`group relative processCardMain overflow-hidden bg-[#E04E36] ${styles.videoCards}`}
    >
      <video
        src={card.videoUrl.desktop}
        poster={card.poster}
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
      />
    </div>
  );
};

export default MobileShow;
