import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoShow.module.css"; // Importing CSS module
import { videoSectionData } from "@/constants";
import { Divider } from "antd";
import { motion } from "framer-motion";
import { useAnimeContext } from "@/context/animeContext";

gsap.registerPlugin(ScrollTrigger);

const VideoShow = () => {
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
  const subtitleRef = useRef(null);
  const { isMobile, xsSize } = useAnimeContext();

  useEffect(() => {
    const container = containerRef.current;
    const scrubValue = 0.5;

    // Set up the horizontal scroll trigger
    gsap.to(thumbnailRefs.current, {
      xPercent: -100 * (videoSectionData.length - 1), // Scroll through all videos
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${container.scrollWidth - window.innerWidth}`, // Adjusting end value
        pin: true,
        scrub: scrubValue,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.round(
            self.progress * (videoSectionData.length - 1)
          );
          setTitle(videoSectionData[index].title);
          setSubTitle(videoSectionData[index].subtitle);
          setTitle2(videoSectionData[index].title2);
          setBackgroundLeft(videoSectionData[index].background);
          setIndex(videoSectionData[index].id);
        },
      },
    });

    // Clean up scroll triggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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

  // New effect to animate the videoLeftSide box from bottom to its initial position when the title changes
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
    <div style={{ zIndex: 999999 }}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.wrapper}>
          {videoSectionData.map((item, i) => (
            <div
              key={item.id}
              id={`thumbnail-${item.id}`}
              ref={(el) => (thumbnailRefs.current[i] = el)}
              className={styles.thumbnail}
              style={{ marginLeft: i === 0 ? "30vw" : "0px" }}
            >
              <video
                src={item.videoUrl.desktop}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
              />
            </div>
          ))}
        </div>

        <div className="absolute right-2 top-2">
          <div>
            <img
              className={styles.logoBrandTitle}
              src="https://res.cloudinary.com/detngwnov/image/upload/v1729778885/Group_33_a22sya.png"
              alt="logo"
            />
          </div>
        </div>

        <div
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
        </div>
      </div>
    </div>
  );
};

export default VideoShow;
