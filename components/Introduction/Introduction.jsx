import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimeContext } from "@/context/animeContext";
import React from "react";
import styles from "./Introduction.module.css";
import { infoData } from "@/constants";
import { Col, Row } from "antd";

gsap.registerPlugin(ScrollTrigger);

const Introduction = () => {
  const { setPageCount } = useAnimeContext();
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 50%",
      end: "top top",
      onEnter: () => setPageCount(2),
      onLeaveBack: () => setPageCount(1),
    });

    return () => {
      trigger.kill();
    };
  }, [setPageCount]);

  return (
    <div ref={sectionRef} className={styles.introduction}>
      <main className={`${styles.info} w-full h-screen`}>
        <Row>
          <Col xl={10} lg={10} md={24} sm={24} xm={24}>
            <div className={`flex flex-col ${styles.iCol1} justify-center`}>
              {infoData.map((data, i) => (
                <div key={i} className={`${styles.iSubhead} pb-8 text-right`}>
                  {data}
                </div>
              ))}
            </div>
          </Col>
          <Col xl={14} lg={14} md={24} sm={24} xm={24}></Col>
        </Row>
      </main>
    </div>
  );
};

export default Introduction;
