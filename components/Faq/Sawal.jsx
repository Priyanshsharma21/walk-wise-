import React, { useRef } from "react";
import styles from "./Faq.module.css";
import { faqData } from "../../constants/index";
import gsap from "gsap";

export default function Sawal() {
  const outerRefs = useRef([]);
  const innerRefs = useRef([]);

  const manageMouseEnter = (index, e) => {
    const outer = outerRefs.current[index];
    const inner = innerRefs.current[index];

    // Slide effect for the question-answer transition
    gsap.set(outer, { top: "-100%" });
    gsap.set(inner, { top: "100%" });
    gsap.to(outer, { top: "0%", duration: 0 });
    gsap.to(inner, { top: "0%", duration: 0.3 });

    // Make the answer visible
    gsap.to(inner, { opacity: 1, duration: 0.3 });
  };

  const manageMouseLeave = (index, e) => {
    const outer = outerRefs.current[index];
    const inner = innerRefs.current[index];

    // Slide effect for the question-answer transition
    gsap.to(outer, { top: "-100%", duration: 0.3 });
    gsap.to(inner, { top: "100%", duration: 0.3 });

    // Hide the answer by setting opacity back to 0
    gsap.to(inner, { opacity: 0, duration: 0.3 });
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.title}>
        <span className={styles.faqFirstLetter}>F</span>requently&nbsp;&nbsp;
        <span className={styles.faqFirstLetter}>A</span>sked&nbsp;&nbsp;
        <span className={styles.faqFirstLetter}>Q</span>uestions&nbsp;&nbsp;
      </h2>
      <div className={styles.faqContainer}>
        {faqData.map((item, index) => (
          <div
            key={item.id}
            className={styles.questionContainer}
            onMouseEnter={(e) => manageMouseEnter(index, e)}
            onMouseLeave={(e) => manageMouseLeave(index, e)}
          >
            <p className={styles.question}>{item.question}</p>
            <div
              className={styles.outer}
              ref={(el) => (outerRefs.current[index] = el)}
            >
              <div
                className={styles.inner}
                ref={(el) => (innerRefs.current[index] = el)}
                style={{ opacity: 0 }} // Initially set opacity to 0
              >
                <div className={styles.answerContainer}>
                  <p className={styles.answer}>{item.answer}</p>

                  <div className={styles.questionNumber}>{index + 1}</div>

                  {/* <p className={styles.answer}>{item.answer}</p> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
