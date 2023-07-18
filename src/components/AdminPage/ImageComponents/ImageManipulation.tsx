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
  const containerRef = useRef<HTMLDivElement>(null);
  const [bound, setBound] = useState(0);
  const [lineStyle, setLineStyle] = useState({});
  const [cursorStyle, setCursorStyle] = useState({});
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

  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [width, setWidth] = useState(0);
  const changeImageCalc = (
    originPoint: { top: number; bottom: number; left: number; right: number },
    newPoint: { x: number; y: number },
    width: number,
    type: number
  ) => {
    // tl
    if (type === 1) {
      const origin = { x: originPoint.left, y: originPoint.top };
      const changeX = newPoint.x - origin.x;
      const changeY = newPoint.y - origin.y;
      console.log(origin);
      if (changeX > changeY) {
        return {
          top: origin.y + changeX,
          bottom: originPoint.bottom,
          left: origin.x + changeX,
          right: originPoint.right,
          width: width - changeX,
        };
      } else {
        return {
          top: origin.y + changeY,
          bottom: originPoint.bottom,
          left: origin.x + changeY,
          right: originPoint.right,
          width: width - changeY,
        };
      }
    }
    // tr
    else if (type === 2) {
      const origin = { x: originPoint.right, y: originPoint.top };
      const changeX = origin.x - newPoint.x;
      const changeY = newPoint.y - origin.y;
      console.log(origin);
      if (changeX > changeY) {
        return {
          top: origin.y + changeX,
          bottom: originPoint.bottom,
          right: origin.x - changeX,
          left: originPoint.left,
          width: width - changeX,
        };
      } else {
        return {
          top: origin.y + changeY,
          bottom: originPoint.bottom,
          right: origin.x - changeY,
          left: originPoint.left,
          width: width - changeY,
        };
      }
    }
    // br
    else if (type === 3) {
      const origin = { x: originPoint.right, y: originPoint.bottom };
      const changeX = origin.x - newPoint.x;
      const changeY = origin.y - newPoint.y;
      console.log(origin);
      if (changeX > changeY) {
        return {
          top: originPoint.top,
          bottom: origin.y - changeX,
          right: origin.x - changeX,
          left: originPoint.left,
          width: width - changeX,
        };
      } else {
        return {
          top: originPoint.top,
          bottom: origin.y - changeY,
          right: origin.x - changeY,
          left: originPoint.left,
          width: width - changeY,
        };
      }
    }
    // bl
    else if (type === 4) {
      const origin = { x: originPoint.left, y: originPoint.bottom };
      const changeX = newPoint.x - origin.x;
      const changeY = origin.y - newPoint.y;
      if (changeX > changeY) {
        return {
          top: originPoint.top,
          bottom: origin.y - changeX,
          right: originPoint.right,
          left: origin.x + changeX,
          width: width - changeX,
        };
      } else {
        return {
          top: originPoint.top,
          bottom: origin.y - changeY,
          right: originPoint.right,
          left: origin.x + changeY,
          width: width - changeY,
        };
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.ImageContainer}
      onMouseDown={(e) => {
        setLineStyle({ backgroundColor: "rgb(240,240,240,.7)" });
        setTop(
          limiterRef.current!.getBoundingClientRect().top -
            containerRef.current!.getBoundingClientRect().top
        );
        setLeft(
          limiterRef.current!.getBoundingClientRect().left -
            containerRef.current!.getBoundingClientRect().left
        );
        setRight(
          limiterRef.current!.getBoundingClientRect().right -
            containerRef.current!.getBoundingClientRect().left
        );

        setBottom(
          limiterRef.current!.getBoundingClientRect().bottom -
            containerRef.current!.getBoundingClientRect().top
        );
        setWidth(limiterRef.current!.getBoundingClientRect().width);

        const newX: number =
          e.clientX - containerRef.current!.getBoundingClientRect().left;
        const newY: number =
          e.clientY - containerRef.current!.getBoundingClientRect().top;

        console.log(newX, newY);

        console.log(
          limiterRef.current!.getBoundingClientRect(),
          containerRef.current!.getBoundingClientRect()
        );
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
          const newX: number =
            e.clientX - containerRef.current!.getBoundingClientRect().left;
          const newY: number =
            e.clientY - containerRef.current!.getBoundingClientRect().top;
          const data = changeImageCalc(
            { top, bottom, left, right },
            { x: newX, y: newY },
            480,
            currCorner
          );

          if (data!.width >= 180) {
            setLimiterStyle({
              top: `${data!.top}px`,
              bottom: `${data!.bottom}px`,
              left: `${data!.left}px`,
              right: `${data!.right}px`,
              width: `${data!.width}px`,
              height: `${data!.width}px`,
            });
          }
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
            setCurrCorner(2);
          }}
          onMouseUp={(e) => {
            upCorner(e);
            setCursorStyle({});
            setCurrCorner(0);
          }}
        ></div>
        <div
          className={styles.botRight}
          onMouseDown={(e) => {
            downCorner(e);
            setCursorStyle({ cursor: "nwse-resize" });
            setCurrCorner(3);
          }}
          onMouseUp={(e) => {
            upCorner(e);
            setCursorStyle({});
            setCurrCorner(0);
          }}
        ></div>
        <div
          className={styles.botLeft}
          onMouseDown={(e) => {
            downCorner(e);
            setCursorStyle({ cursor: "nesw-resize" });
            setCurrCorner(4);
          }}
          onMouseUp={(e) => {
            upCorner(e);
            setCursorStyle({});
            setCurrCorner(0);
          }}
        ></div>
      </div>
    </div>
  );
}
