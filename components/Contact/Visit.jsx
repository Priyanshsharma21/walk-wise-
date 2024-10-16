import React from "react";
import styles from "./Sampark.module.css";
import { FaArrowDownLong } from "react-icons/fa6";

const Visit = () => {
  return (
    <div className={styles.visitBox}>
      <FaArrowDownLong className={styles.visitArrow} />
      {/* <span className={styles.visitText}>Visit</span> */}
    </div>
  );
};

export default Visit;
