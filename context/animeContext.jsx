"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [breakPoint] = useState(768);
  const [isMobile, setIsMobile] = useState(false); // Default to false to avoid SSR issues
  const [showWebsite, setShowWebsite] = useState(false);
  const [isLoaderCompleted, setIsLoaderCompleted] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const navRef = useRef(null);

  useEffect(() => {
    // This effect runs only on the client side
    setIsMobile(window.innerWidth <= breakPoint);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakPoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakPoint]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWebsite(true);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
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
