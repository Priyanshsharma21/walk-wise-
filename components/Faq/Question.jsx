import React, { useRef } from "react";
import { motion } from "framer-motion";
import { mountAnim, rotateX } from "../../utils/index";
import styles from "./Faq.module.css";
import Link from "next/link";

const Question = ({ data, index }) => {
  const { question, answer } = data;
  const outer = useRef(null);
  const inner = useRef(null);

  const manageMouseEnter = (e) => {
    const bounds = e.target.getBoundingClientRect();
    if (e.clientY < bounds.top + bounds.height / 2) {
      gsap.set(outer.current, { top: "-100%" });
      gsap.set(inner.current, { top: "100%" });
    } else {
      gsap.set(outer.current, { top: "100%" });
      gsap.set(inner.current, { top: "-100%" });
    }
    gsap.to(outer.current, { top: "0%", duration: 0.3 });
    gsap.to(inner.current, { top: "0%", duration: 0.3 });
  };

  const manageMouseLeave = (e) => {
    const bounds = e.target.getBoundingClientRect();
    if (e.clientY < bounds.top + bounds.height / 2) {
      gsap.to(outer.current, { top: "-100%", duration: 0.3 });
      gsap.to(inner.current, { top: "100%", duration: 0.3 });
    } else {
      gsap.to(outer.current, { top: "100%", duration: 0.3 });
      gsap.to(inner.current, { top: "-100%", duration: 0.3 });
    }
  };
  return (
    <motion.div
      onMouseEnter={(e) => {
        manageMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        manageMouseLeave(e);
      }}
      variants={rotateX}
      {...mountAnim}
      custom={index}
      className={styles.el}
    >
      <Link href="/">{question}</Link>
      <div ref={outer} className={styles.outer}>
        <div ref={inner} className={styles.inner}>
          {[...Array(1)].map((_, index) => {
            return (
              <div key={index} className={styles.container}>
                <p className={styles.para}>{answer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Question;
