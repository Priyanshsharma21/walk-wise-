import React from "react";
import styles from "./Introduction.module.css";
import Image from "next/image";
import { demo } from "@/assets";

const Introduction = () => {
  return (
    <div
      data-cursor="-inverse"
      className={`w-full h-full flex justify-center items-center ${styles.intro}`}
    >
      <Image src={demo} className="w-full h-screen object-cover" />
    </div>
  );
};

export default Introduction;
