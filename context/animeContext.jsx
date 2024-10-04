"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [breakPoint] = useState(768);
  const [isMobile, setIsMobile] = useState(false); // Initially false, set later in useEffect
  const [showWebsite, setShowWebsite] = useState(false);
  const [isLoaderCompleted, setIsLoaderCompleted] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const navRef = useRef(null);

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= breakPoint);

      const handleResize = () => {
        setIsMobile(window.innerWidth <= breakPoint);
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
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
