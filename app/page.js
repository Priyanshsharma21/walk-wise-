"use client";
import { useAnimeContext } from "../context/animeContext";
import React, { useEffect } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader/Preloader";
import Home from "@/components/Home/Home";
import Navbar from "@/components/Navbar/Navbar";

const page = () => {
  const { isMobile } = useAnimeContext();



  return (
    <div className="app w-full">
      <Preloader />
      <div className="home-outer flex flex-col items-center justify-center">
        <Navbar />

        <Home />
      </div>
    </div>
  );
};

export default page;
