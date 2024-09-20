import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { logo } from "@/assets";
import { IoLogoYoutube } from "react-icons/io";
export const navbarData = {
  logo: {
    src: logo,
    to: "/",
  },

  socialMedia: [
    {
      id: 1,
      icon: FaXTwitter,
      title: "Twitter",
      link: "https://x.com/lamarcaitaly",
    },
    {
      id: 2,
      icon: FaFacebookSquare,
      title: "Facebook",
      link: "https://www.facebook.com/lamarcaitaly/",
    },

    {
      id: 3,
      icon: IoLogoYoutube,
      title: "youtube",
      link: "https://www.youtube.com/channel/UChUxVVI8ZHIlp3Yf_DHiq3Q",
    },

    {
      id: 4,
      icon: FaInstagram,
      title: "Instagram",
      link: "https://www.instagram.com/lamarcaitaly/",
    },
  ],
};

export const footprintHeroData = [
  {
    id: 1,
    size: 20,
    rotationAngle: 180,
  },
  {
    id: 2,
    size: 25,
    rotationAngle: 160,
  },

  {
    id: 3,
    size: 30,
    rotationAngle: 140,
  },

  {
    id: 4,
    size: 35,
    rotationAngle: 120,
  },

  {
    id: 5,
    size: 40,
    rotationAngle: 100,
  },

  {
    id: 6,
    size: 45,
    rotationAngle: 80,
  },

  {
    id: 7,
    size: 50,
    rotationAngle: 60,
  },

  {
    id: 8,
    size: 55,
    rotationAngle: 40,
  },

  {
    id: 9,
    size: 60,
    rotationAngle: 20,
  },
  {
    id: 10,
    size: 65,
    rotationAngle: 0,
  },
];
