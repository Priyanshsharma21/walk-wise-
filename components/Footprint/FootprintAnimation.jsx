import { footprintImg } from "@/assets";
import { footprintHeroData } from "@/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FootprintAnimation = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index === 10) {
        return;
      }
      setItems([footprintHeroData[index]]);
      index++;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", height: "500px" }}>
      {footprintHeroData.map((footprint) => (
        <>
          {footprint ? (
            <div
              key={footprint.id}
              className="absolute"
              style={{
                width: `${footprint.size}px`,
                transform: `rotate(-${footprint.rotationAngle}deg)`,
                bottom: `${footprint.id * 50}px`, // Adjust position for vertical spacing
                left: `${footprint.id * 50}px`, // Adjust position for horizontal spacing
                transition:
                  "transform 0.5s ease, top 0.5s ease, left 0.5s ease", // Smooth transition
              }}
            >
              <Image
                alt="footprint"
                src={footprintImg}
                width={footprint.size} // Dynamic width for footprint
                height={footprint.size} // Dynamic height for footprint
              />
            </div>
          ) : (
            <></>
          )}
        </>
      ))}
    </div>
  );
};

export default FootprintAnimation;
