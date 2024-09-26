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
      style={{ zIndex: 9999999999999999999999999999999 }}
      className={`${styles.navbar} w-full h-screen flex flex-col justify-between fixed top-0`}
    >
      <div className={`${styles.navTop} flex justify-between items-center`}>
        <Image src={logo} alt="logo" className={styles.navLogo} />
        {/* <div className={`${styles.navBtn} flex items-center`}>
          <div className={styles.navTopText}>Premium collection</div>
          <div
            onClick={() =>
              handleClick("https://lamarcaitaly.com/collections/oxford-2")
            }
            className={styles.buyNow}
          >
            <span className={styles.text}>Buy Now</span>
            <span className={styles.thanksText}>Buy Now</span>
          </div>
        </div> */}
      </div>

      <div className={`${styles.navBottom} flex items-center justify-between`}>
        <div className={`${styles.navbarBottomRight} flex items-center`}>
          {/* <div className={`${styles.socialMedia} flex`}>
            {navbarData.socialMedia.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                className={`${
                  i === 0 ? styles.navIconsFor1 : styles.navIcons
                } flex`}
              >
                <item.icon className={`${styles.navIcon}`} />
              </a>
            ))}
          </div> */}
          {/* <div className={`fixed right-10`}>
            <CiDesktopMouse2 className={styles.mouseIcon} />
          </div> */}
        </div>

        {/* <div className={`${styles.navBottomLeft} flex`}>
          <div
            className={`${styles.navBottomNumber} ${styles.navBottomNumber1}`}
          >
            {pageCount}
          </div>
          <div className={`${styles.navBottomNumber}`}>/</div>
          <div className={`${styles.navBottomNumber}`}>5</div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;


