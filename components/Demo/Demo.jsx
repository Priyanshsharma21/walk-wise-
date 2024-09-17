import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useTransform, useScroll } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function getCurrentFrame(index) {
  return `/mountainSeq/${(index + 33).toString().padStart(4, "0")}.png`;
}

const Demo = ({
  numFrames = 393,
  width,
  height,
  initialWidth,
  initialHeight,
}) => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [canvasSize, setCanvasSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  useEffect(() => {
    function preloadImages() {
      const loadedImages = [];
      for (let i = 0; i < numFrames; i++) {
        const img = new Image();
        img.src = getCurrentFrame(i);
        img.onload = () => {
          loadedImages.push(img);
          if (loadedImages.length === numFrames) {
            setImages(loadedImages);
          }
        };
      }
    }

    preloadImages();

    const ctx = canvasRef.current.getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    ScrollTrigger.create({
      trigger: canvasRef.current,
      start: "top top",
      end: `+=${height}`,
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const index = Math.min(numFrames - 1, Math.ceil(progress * numFrames));
        setFrameIndex(index);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [numFrames, width, height]);

  useEffect(() => {
    if (!canvasRef.current || images.length < 1) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    let requestId;

    const render = () => {
      context.clearRect(0, 0, canvasSize.width, canvasSize.height); // Clear canvas before drawing
      context.drawImage(
        images[frameIndex],
        0,
        0,
        canvasSize.width,
        canvasSize.height
      );
      requestId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(requestId);
  }, [frameIndex, images, canvasSize]);

  useEffect(() => {
    const handleResize = () => {
      const aspectRatio = initialWidth / initialHeight;
      const newWidth = window.innerWidth;
      const newHeight = newWidth / aspectRatio;
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [initialWidth, initialHeight]);

  return (
    <div className="overflow-hidden">
      <div
        style={{
          position: "relative",
          height: `${height}px`,
          width: "100%",
        }}
      >
        <canvas ref={canvasRef} className="canvas-style" />
      </div>
      <div style={{ height: "120vh" }} />
    </div>
  );
};

export default Demo;
