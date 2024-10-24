"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [breakPoint] = useState(768);
  const [xsBreakPoint] = useState(500);
  const [isMobile, setIsMobile] = useState(false); // Initially false, set later in useEffect
  const [xsSize, setXsSize] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [isLoaderCompleted, setIsLoaderCompleted] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [enableSmoothScroll, setEnableSmoothScroll] = useState(true);
  const [isShowLoaded, setIsShowLoaded] = useState(false);
  const navRef = useRef(null);

  const [contentVisible, setContentVisible] = useState(false);
  const [prevIsMobile, setPrevIsMobile] = useState(false); // Track previous isMobile value

  let appRef = useRef(null);

  // Detect window resize and handle mobile/desktop state
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= breakPoint);
      setXsSize(window.innerWidth <= xsBreakPoint);
      setPrevIsMobile(window.innerWidth <= breakPoint); // Set initial prevIsMobile

      const handleResize = () => {
        setIsMobile(window.innerWidth <= breakPoint);
        setXsSize(window.innerWidth <= xsBreakPoint);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [breakPoint]);

  // Reload the page when the isMobile state changes
  useEffect(() => {
    if (prevIsMobile !== isMobile) {
      setPrevIsMobile(isMobile); // Update the previous state before reloading
      window.location.reload(); // Reload the page when transitioning between mobile and desktop
    }
  }, [isMobile, prevIsMobile]);

  return (
    <AnimeContext.Provider
      value={{
        appRef,
        isMobile,
        showWebsite,
        setShowWebsite,
        setPageCount,
        pageCount,
        navRef,
        setIsLoaderCompleted,
        isLoaderCompleted,
        setShowBtn,
        showBtn,
        xsSize,
        contentVisible,
        setContentVisible,
        setEnableSmoothScroll,
        enableSmoothScroll,
        setIsShowLoaded,
        isShowLoaded,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
