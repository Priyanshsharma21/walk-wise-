import React from "react";
import { logo } from "@/assets";
import Image from "next/image";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center">
      <div className="nav-logo-box">
        <img src={logo} alt="logo"/>
      </div>
    </nav>
  );
};

export default Navbar;
