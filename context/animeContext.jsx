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
  const navRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= breakPoint);
      setXsSize(window.innerWidth <= xsBreakPoint);

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

  useEffect(() => {
    setTimeout(() => {
      setShowWebsite(true);
    }, 3000);
  }, []);

  let appRef = useRef(null);

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
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
