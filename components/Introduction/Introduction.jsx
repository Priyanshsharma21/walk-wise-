import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useAnimeContext } from "@/context/animeContext";
import React from "react";
import styles from "./Introduction.module.css";
import stylez from "../Hero/Hero.module.css";
import { infoData } from "@/constants";
import { Col, Row } from "antd";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Introduction = () => {
  const { setPageCount } = useAnimeContext();
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const subheadRefs = useRef([]);
  const comfortRef = useRef(null);
  const stepIntoRef = useRef(null);
  const zoneRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;

    // Set initial opacity of subhead elements to 0.1
    gsap.set(subheadRefs.current, { opacity: 0.1 });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 10%",
      end: "+=300%",
      onEnter: () => setPageCount(2),
      onLeaveBack: () => setPageCount(1),
      pin: true,
      scrub: 1,
    });

    // Animation for each subhead element with stagger
    gsap.to(subheadRefs.current, {
      opacity: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: element,
        start: "top 50%",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setPageCount]);

  return (
    <div ref={sectionRef} className={styles.introduction}>
      <main className={`${styles.info} w-full h-screen`}>
        <Row>
          <Col xl={9} lg={9} md={24} sm={24} xm={24}>
            <div className={`flex flex-col ${styles.iCol1} justify-center`}>
              {infoData.map((data, i) => (
                <div
                  key={i}
                  className={`${styles.iSubhead} pb-8 text-right`}
                  ref={(el) => (subheadRefs.current[i] = el)} // Collect refs
                >
                  {data}
                </div>
              ))}
            </div>
          </Col>
          <Col xl={15} lg={15} md={24} sm={24} xm={24}></Col>
        </Row>

        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <section
              className={`${styles.hero} w-full min-h-full`}
              ref={heroRef}
            >
              <div className={`${styles.heroContent} flex flex-col`}>
                <h4
                  ref={stepIntoRef}
                  className={`${styles.heroSubTitle} text-6xl text-white text-left`}
                  // style={{ opacity: 0 }}
                >
                  have the
                </h4>

                <h1
                  className={`${styles.heroTitle} text-6xl text-white flex items-center`}
                  ref={comfortRef}
                >
                  world
                </h1>

                <h4
                  ref={zoneRef}
                  className={`${styles.heroSubTitle2} text-6xl text-white text-right`}
                  // style={{ opacity: 0 }}
                >
                  at your feet
                </h4>
              </div>
            </section>
          </Col>
        </Row>
      </main>

      <div className="w-full h-[350vh]" />
    </div>
  );
};

export default Introduction;
