import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Row, Col } from "antd";
import styles from "./VideoShow.module.css";
import { useAnimeContext } from "@/context/animeContext";

gsap.registerPlugin(ScrollTrigger);

const videoContent = [
  {
    videoUrl:
      "https://res.cloudinary.com/dlxpea208/video/upload/v1727275746/wwc_materials_zvpbxx.mp4",
    title: "Some random title 1",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/dlxpea208/video/upload/v1727275746/wwc_materials_zvpbxx.mp4",
    title: "Some random title 2",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/dlxpea208/video/upload/v1727275746/wwc_materials_zvpbxx.mp4",
    title: "Some random title 3",
  },
];

const VideoShow = () => {
  const videoRefs = useRef([]);
  const sectionRef = useRef(null);
  const { setPageCount } = useAnimeContext();

  useEffect(() => {
    const element = sectionRef.current;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 7%",
      end: "+=300%",
      onEnter: () => setPageCount(3),
      onLeaveBack: () => setPageCount(2),
    });

    return () => {
      trigger.kill();
    };
  }, [setPageCount]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000", // Adjust based on how long you want the scroll section to be
          pin: true,
          scrub: 1,
        },
      });

      videoRefs.current.forEach((video, index) => {
        scrollTimeline
          .to(video, {
            scale: 1, // Scale up when active
            filter: "blur(0)", // Remove blur
            duration: 0.5,
            onStart: () => video.play(), // Play video on enter
          })
          .to(
            video,
            {
              scale: 0.8, // Scale down when inactive
              filter: "blur(5px)", // Apply blur
              duration: 0.5,
              onComplete: () => video.pause(), // Pause video on leave
            },
            index * 2
          ); // Stagger timing for each video
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="w-full h-screen flex items-center justify-center"
      >
        <Row gutter={[16, 16]} justify="center">
          {videoContent.map((video, index) => (
            <Col key={index} xl={8} lg={8} md={12} sm={24} xs={24}>
              <div className={styles.videoCard}>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={styles.video}
                  src={video.videoUrl}
                  muted
                  loop
                  preload="auto"
                />
                <div className={styles.videoTitle}>{video.title}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="w-full h-[300vh]" />
    </>
  );
};

export default VideoShow;
