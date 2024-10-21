import React from "react";
import { logo } from "../../assets";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { navbarData } from "@/constants";
import { CiDesktopMouse2 } from "react-icons/ci";
import { useAnimeContext } from "@/context/animeContext";

const Navbar = () => {
  const { pageCount, setPageCount, navRef } = useAnimeContext();

  const handleClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <nav
      ref={navRef}
      style={{ zIndex: 9 }}
      className={`${styles.navbar} w-full flex flex-col justify-between fixed top-0`}
    >
      <div className={`${styles.navTop} flex justify-between items-center`}>
        <img
          src={`https://res.cloudinary.com/dlxpea208/image/upload/v1729494123/LOGO_a8usuq.png`}
          alt="logo"
          className={styles.navLogo}
        />
      </div>
    </nav>
  );
};

export default Navbar;
