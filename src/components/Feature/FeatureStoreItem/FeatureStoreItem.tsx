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
