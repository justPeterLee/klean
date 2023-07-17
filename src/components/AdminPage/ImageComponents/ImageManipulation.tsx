"use client";
import styles from "./ImageMainpulation.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useState, useRef, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import { DraggableCore } from "react-draggable";
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
  const [bound, setBound] = useState(0);
  const [lineStyle, setLineStyle] = useState({});
  const [cursorStyle, setCursorStyle] = useState({});
  const [scaleOrigin, setScaleOrigin] = useState(0);
  const [currCorner, setCurrCorner] = useState(0);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ active, cancel, offset: [mx, my] }) => {
      if (imageRef.current?.offsetWidth && limiterRef.current?.offsetWidth) {
        setBound(
          (imageRef.current.offsetWidth -
            (limiterRef.current.offsetWidth - 4)) /
            2
        );
      }
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

  const [scale, setScale] = useState(false);
  const [limiterStyle, setLimiterStyle] = useState({});
  const downCorner = (e: any) => {
    setScale(true);
  };
  const upCorner = (e: any) => {
    setScale(false);
  };

  return (
    <div
      className={styles.ImageContainer}
      onMouseDown={(e) => {
        setLineStyle({ backgroundColor: "rgb(240,240,240,.7)" });
        setScaleOrigin((e.clientX + e.clientY) / 2);
        console.log(e.clientX, e.clientY);
      }}
      onMouseUp={() => {
        setLineStyle({});
        setScale(false);
        setCursorStyle({});
        setCurrCorner(0);
        setLimiterStyle({});
      }}
      onMouseMove={(e) => {
        if (scale && currCorner) {
          //   console.log(true);
          //   console.log(e.clientX);
          console.log(scaleOrigin);
          console.log(currCorner);
          setLimiterStyle({
            transformOrigin: "0% 0%",
            transform: "scale(.5)",
          });
        }
      }}
      style={cursorStyle}
    >
      {/* <animated.div className={styles.dragImage} {...bind()} style={{ x, y }}> */}
      <animated.img
        {...bind()}
        style={{ x, y, ...cursorStyle }}
        src={URL.createObjectURL(image)}
        alt={`Selected Image ${0}`}
        height={580}
        className={styles.imageOne}
        onDragStart={handleDragStart}
        ref={imageRef}
      />
      {/* </animated.div> */}

      <div className={styles.centerDiv}>
        <div
          className={styles.imageLimitContainer}
          ref={limiterRef}
          style={limiterStyle}
        >
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
          <div className={styles.guideLines}>
            <div className={styles.line} style={lineStyle}></div>
            <div className={styles.line} style={lineStyle}></div>
            <div className={styles.lineUp} style={lineStyle}></div>
            <div className={styles.lineUp2} style={lineStyle}></div>
          </div>
          <div
            className={styles.topLeft}
            onMouseDown={(e) => {
              downCorner(e);
              setCursorStyle({ cursor: "nwse-resize" });
              setScaleOrigin((e.clientX * e.clientY) / 2);
              setCurrCorner(1);
            }}
            onMouseUp={(e) => {
              upCorner(e);
              setCursorStyle({});
              setCurrCorner(0);
            }}
          >
            {JSON.stringify(currCorner)}
          </div>
          <div
            className={styles.topRight}
            onMouseDown={(e) => {
              downCorner(e);
              setCursorStyle({ cursor: "nesw-resize" });
            }}
            onMouseUp={(e) => {
              upCorner(e);
              setCursorStyle({});
            }}
          ></div>
          <div
            className={styles.botRight}
            onMouseDown={(e) => {
              downCorner(e);
              setCursorStyle({ cursor: "nwse-resize" });
            }}
            onMouseUp={(e) => {
              upCorner(e);
              setCursorStyle({});
            }}
          ></div>
          <div
            className={styles.botLeft}
            onMouseDown={(e) => {
              downCorner(e);
              setCursorStyle({ cursor: "nesw-resize" });
            }}
            onMouseUp={(e) => {
              upCorner(e);
              setCursorStyle({});
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
