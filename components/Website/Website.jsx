import React from "react";
import styles from "./Website.module.css";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import { useAnimeContext } from "@/context/animeContext";
import Introduction from "../Introduction/Introduction";
import VideoShow from "../VideoShowcase/VideoShow";

const Website = () => {
  const { showWebsite, isLoaderCompleted } = useAnimeContext();

  const showMainWebsite = () => {
    if (isLoaderCompleted && showWebsite) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section
      className={styles.website}
      style={{ opacity: showMainWebsite() ? 1 : 0 }}
    >
      <div className={styles.gradientBackground}></div>

      <div className={styles.content}>
        <Navbar />
        <Hero />
        <Introduction />
        <VideoShow />
      </div>
    </section>
  );
};

export default Website;
