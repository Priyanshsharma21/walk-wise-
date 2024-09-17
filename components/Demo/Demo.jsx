import React, { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import styles from "./Demo.module.css";

gsap.registerPlugin(ScrollTrigger);

const Demo = ({ height }) => {
  const demoRef = useRef(null);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    const handleMetadataLoaded = () => {
      // Set video duration after metadata is loaded
      if (video && video.duration) {
        setVideoDuration(video.duration);
      }
    };

    video.addEventListener("loadedmetadata", handleMetadataLoaded);

    // Register ScrollTrigger instance
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: demoRef.current,
      start: "top top",
      end: () => `+=${videoDuration * 200}`, // Set end based on video duration (in milliseconds)
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        if (video && video.duration) {
          video.currentTime = progress * video.duration; // Sync video frames with scroll progress
        }
      },
    });

    // Cleanup on unmount
    return () => {
      video.removeEventListener("loadedmetadata", handleMetadataLoaded);
      scrollTriggerInstance.kill();
      ScrollTrigger.refresh();
    };
  }, [videoDuration]);

  return (
    <div
      className="absolute top-0"
      style={{
        position: "relative",
        height: height,
        width: "100%",
        overflow: "hidden",
      }}
      ref={demoRef}
    >
      <video
        ref={videoRef}
        className={`${styles.videoTransition}`}
        src="https://res.cloudinary.com/dlxpea208/video/upload/v1726568387/transition_fitxu8.mp4"
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Demo;
