"use client";

import React from "react";
import { useAnimeContext } from "@/context/animeContext";

const Responsive = ({ desktop, mobile }) => {
  const { isMobile } = useAnimeContext();

  return <>{isMobile ? mobile : desktop}</>;
};

export default Responsive;
