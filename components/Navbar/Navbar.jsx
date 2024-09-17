import React from "react";
import { logo } from "@/assets";
import Image from "next/image";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={` w-full sticky top-0 flex justify-between items-start`}>
      <div
        className={`navbar-about ${styles.navbarAbout} fixed text-[#e2e2e2] right-5`}
      >
        Walk Wise Collective Pvt Ltd
      </div>
    </div>
  );
};

export default Navbar;
