import React, { useEffect, useRef } from "react";
import "./video.css";
import { videoSectionData } from "@/constants";
import { Col, Row } from "antd";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText"; // Import SplitText plugin

gsap.registerPlugin(ScrollTrigger, SplitText);

const Video = () => {
  const sectionRefs = useRef([]); // Refs for each section

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      // Split the title into characters and the subtitle into words
      const titleEl = section.querySelector(".videoTitle");
      const subtitleEl = section.querySelector(".videoSubtitle");
      const subtitleBox = section.querySelector(".videoSubtitleBox");

      const splitTitle = new SplitText(titleEl, { type: "chars" });
      const splitSubtitle = new SplitText(subtitleEl, { type: "words" }); // Splitting subtitle by words

      // Create the animation timeline for each section
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top +0", // Start when the section enters the viewport
            end: "bottom center", // End when the section scrolls out
            scrub: true,
            pin: true, // Pin the section during the animation
          },
        })
        .fromTo(
          splitTitle.chars,
          { y: 100, opacity: 1, overflow: "hidden" },
          {
            y: 0,
            opacity: 1,
            overflow: "hidden",
            stagger: 0.15,
            duration: 7,
            ease: "power4.inOut",
          }
        )
        .fromTo(
          subtitleBox,
          { backgroundColor: "#12121200" },
          {
            backgroundColor: "#7100713f",
            duration: 7,
            ease: "power4.inOut",
          }
        )
        .fromTo(
          splitSubtitle.words, // Animate word by word for subtitle
          { y: 40, opacity: 1, overflow: "hidden" },
          {
            y: 0,
            opacity: 1,
            overflow: "hidden",
            stagger: 0.15,
            duration: 7,
            ease: "power4.inOut",
          },
          "-=5" // Start subtitle animation slightly overlapping the title animation
        );
    });

    // Cleanup on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full">
      {videoSectionData.map((video, index) => (
        <div
          key={index}
          className="videoCard"
          ref={(el) => (sectionRefs.current[index] = el)} // Assign each section its own ref
        >
          <Row className="h-full w-full" gutter={[16, 16]}>
            {/* Left Column (Text) */}
            <Col
              className="h-full w-full col1"
              xl={8}
              lg={8}
              md={12}
              sm={12}
              xs={12}
            >
              <div className="videoLeft flex flex-col items-center justify-around">
                <div className="videoTitle">{video.title}</div>
                <div className="videoSubtitleBox">
                  <div className="videoSubtitle">{video.subtitle}</div>
                </div>
              </div>
            </Col>

            {/* Right Column (Video) */}
            <Col
              className="h-full w-full"
              xl={16}
              lg={16}
              md={12}
              sm={12}
              xs={12}
            >
              <div className="videoRight w-full h-full">
                <video
                  preload="preload"
                  poster={video.poster}
                  muted
                  playsInline
                  loop
                  autoPlay
                  className="w-full h-full object-cover video"
                >
                  <source src={video.videoUrl} />
                </video>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Video;
