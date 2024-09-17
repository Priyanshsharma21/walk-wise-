"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [breakPoint] = useState(768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakPoint);
  const [showWebsite, setShowWebsite] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakPoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

// Hook to use the AnimeContext
export const useAnimeContext = () => useContext(AnimeContext);
