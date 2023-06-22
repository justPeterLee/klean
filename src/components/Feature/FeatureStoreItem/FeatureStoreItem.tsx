"use client";
import styles from "../Feature.module.css";
import { useState } from "react";
interface FeatureStoreItem {
  id: number;
  name: string;
  price: string;
  image?: string;
}
export default function FeatureStoreItem(props: FeatureStoreItem) {
  const { id, name, price, image } = props;
  return (
    <div className={styles.StoreItemContainer}>
      <button className={styles.StoreItemImage}>image</button>
      <div className={styles.StoreItemInfo}>
        <p>{name}</p> <p>{price}</p>
      </div>
    </div>
  );
}

interface CaruselItem {
  caruselItem: {
    id: number;
    product_name: string;
    product_image: string;
    price: string;
  }[];
}

export function StoreFeature(props: CaruselItem) {
  const { caruselItem } = props;
  const [carouselPosition, setCarouselPosition] = useState(0);

  const handleCarouselLeft = () => {
    if (carouselPosition > 0) {
      setCarouselPosition(carouselPosition - 1);
    }
  };

  const handleCarouselRight = () => {
    if (carouselPosition < 3) {
      setCarouselPosition(carouselPosition + 1);
    }
  };

  return (
    <div className={styles.storeFeature}>
      <button
        className={styles.storeButton}
        style={{ left: "-5rem" }}
        onClick={handleCarouselLeft}
      >
        {"<"}
      </button>
      <div className={styles.storeCarousel}>
        <div
          className={`${styles.storeCarouselSub} ${
            carouselPosition === 1
              ? styles.right1
              : carouselPosition === 2
              ? styles.right2
              : carouselPosition === 3
              ? styles.right3
              : {}
          }`}
        >
          {caruselItem &&
            caruselItem.map((item) => (
              <FeatureStoreItem
                key={item.id}
                id={item.id}
                name={item.product_name}
                price={item.price}
              />
            ))}
        </div>
      </div>
      <button
        className={styles.storeButton}
        style={{ right: "-5rem" }}
        onClick={handleCarouselRight}
      >
        {">"}
      </button>
    </div>
  );
}

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
