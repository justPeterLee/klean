"use client";
import styles from "./ImageMainpulation.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState, useRef, useEffect } from "react";
interface ImageManipulationProps {
  hide: () => void;
  image: any;
}
export function ImageMainpulation({ hide, image }: ImageManipulationProps) {
  return (
    <div className={styles.ImageMainpulationContainer}>
      <div className={styles.ImageMainpulation}>
        <ImageManipulationButton hide={hide} />

        <ImageManipulationImage image={image} />
      </div>
    </div>
  );
}

function ImageManipulationButton({ hide }: { hide: () => void }) {
  return (
    <>
      <button
        className={styles.cancelButton}
        onClick={() => {
          hide();
        }}
      >
        <AiOutlinePlus className={styles.X} />
      </button>
      <button
        className={styles.saveButton}
        onClick={() => {
          hide();
        }}
      >
        <p>Save</p>
      </button>
    </>
  );
}

function ImageManipulationImage({ image }: { image: any }) {
  const limiterRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLeft, setImageLeft] = useState(0);
  const [limiter, setLimiter] = useState(0);
  const [bound, setBound] = useState(0);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ active, cancel, offset: [mx, my] }) => {
      console.log(imageRef.current?.offsetLeft);
      console.log(imageRef.current?.offsetLeft);
      if (imageRef.current?.offsetLeft && limiterRef.current?.offsetLeft) {
        setImageLeft(imageRef.current.offsetLeft);
        setBound(limiterRef.current.offsetLeft - imageRef.current.offsetLeft);
      }
      if (limiterRef.current?.offsetLeft) {
        setLimiter(limiterRef.current.offsetLeft);
      }
      //   console.log(
      //     limiterRef.current?.offsetLeft - imageRef.current?.offsetLeft
      //   );
      api.start({ x: mx, y: my, immediate: active });
    },
    {
      bounds: {
        right: bound,
        left: bound * -1,
        top: -50,
        bottom: 50,
      },
    }
  );

  const handleDragStart = (event: any) => {
    event.preventDefault();
  };

  const downCorner = (e: any) => {};
  return (
    <div className={styles.ImageContainer}>
      {/* <animated.div className={styles.dragImage} {...bind()} style={{ x, y }}> */}
      <animated.img
        {...bind()}
        style={{ x, y }}
        src={URL.createObjectURL(image)}
        alt={`Selected Image ${0}`}
        height={580}
        className={styles.imageOne}
        onDragStart={handleDragStart}
        ref={imageRef}
      />
      {/* </animated.div> */}

      <div className={styles.imageLimitContainer} ref={limiterRef}>
        <svg viewBox="0 0 1 1" style={{ pointerEvents: "none" }}>
          <path
            d="M -40 -40 L -40 41 L 41 41 L 41 -40 Z M 0 .5 A .5 .5 0 0 0 1 .5 A .5 .5 0 0 0 0 .5 "
            fill="#202124 "
            fillRule="evenodd"
            fillOpacity=".55"
          ></path>
          <path
            d="M -40 -40 L -40 41 L 41 41 L 41 -40 Z M 0 0 L 1 0 L 1 1 L 0 1 Z "
            fill="#202124 "
            fillRule="evenodd"
            fillOpacity=".55"
          ></path>
        </svg>
        <div className={styles.limitLines}></div>
        <div
          className={styles.topLeft}
          onMouseDown={(e) => {
            downCorner(e);
          }}
        ></div>
        <div className={styles.topRight}></div>
        <div className={styles.botRight}></div>
        <div className={styles.botLeft}></div>
      </div>
    </div>
  );
}
