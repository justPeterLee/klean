"use client";
import styles from "../Feature.module.css";
import { useState } from "react";

interface StoreCarouselProps {
  data: { id: number; name: string; price: string; image: string }[];
}
export function StoreCarousel(props: StoreCarouselProps) {
  const { data } = props;
  const transitionPerItem = 16.8;
  const maxClick = Math.floor(data.length / 3);
  const minClick = 0;
  const lastClick =
    (data.length - Math.floor(data.length / 3) * 3) * transitionPerItem; // multpily by per trans (33.6)

  const [clickPos, setClickPos] = useState(0);
  const [transitionPos, setTransitionPos] = useState(0);

  const moveLeft = () => {
    if (clickPos > minClick) {
      setClickPos(clickPos - 1);
      if (clickPos === minClick + 1) {
        setTransitionPos(0);
      } else {
        setTransitionPos(transitionPos - transitionPerItem * 3);
      }
    }
  };

  const moveRight = () => {
    if (clickPos < maxClick) {
      setClickPos(clickPos + 1);
      if (clickPos === maxClick - 1) {
        setTransitionPos(transitionPos + lastClick);
      } else {
        setTransitionPos(transitionPos + transitionPerItem * 3);
      }
    }
  };

  return (
    <div className={styles.CaruselContainer}>
      <button
        className={styles.CaruselButton}
        style={{ left: "-5rem" }}
        onClick={moveLeft}
      >
        {"<"}
      </button>
      <div className={styles.CaruselDisplay}>
        <div
          className={`${styles.CaruselDisplaySub}`}
          style={{ transform: `translateX(-${transitionPos}rem)` }}
        >
          {data.length ? (
            data.map((item) => (
              <StoreCarouselItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p>no items</p>
          )}
        </div>
      </div>
      <button
        className={styles.CaruselButton}
        style={{ right: "-5rem" }}
        onClick={moveRight}
      >
        {">"}
      </button>
    </div>
  );
}

interface StoreCarouselItem {
  id: number;
  name: string;
  price: string;
  image: string;
}
function StoreCarouselItem(props: StoreCarouselItem) {
  const { id, name, price, image } = props;

  return (
    <div className={styles.StoreCarouselItemContainer}>
      <div className={styles.CaruselItemImage}>{image}</div>
      <span className={styles.CaruselItemInfo}>
        <p>{name}</p>
        <p>{price}</p>
      </span>
    </div>
  );
}
