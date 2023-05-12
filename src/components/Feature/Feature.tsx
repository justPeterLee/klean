"use client";
import { useState } from "react";
import styles from "./Feature.module.css";
import Menu from "./Menu/Menu";
export function MainFeature() {
  const [optionSelected, setOptionSelected] = useState("color 1");

  const readOption = (option: string) => {
    setOptionSelected(option);
  };

  return (
    <div
      className={styles.MainFeatureContainer}
      style={
        optionSelected === "color 1"
          ? { backgroundColor: "rgb(38, 104, 103, 0.6)" }
          : optionSelected === "color2"
          ? { backgroundColor: "rgba(248, 188, 36, 1)" }
          : optionSelected === "color3"
          ? { backgroundColor: "rgba(245, 136, 0, 1)" }
          : {}
      }
    >
      <Menu options={["color1", "color2", "color3"]} readOption={readOption} />
      <button className={styles.viewProductButton}>view product</button>
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
export function storeFeature(props: CaruselItem) {
  const { caruselItem } = props;

  return (
    <div className={styles.storeFeature}>
      <button className={styles.storeButton}>{"<"}</button>
      <div className={styles.storeCarousel}>
        {caruselItem &&
          caruselItem.map((item) => (
            <button key={item.id}>
              <div>image</div>
              <div>
                <p>{item.product_name}</p> <p>{item.price}</p>
              </div>
            </button>
          ))}
      </div>
      <button className={styles.storeButton}>{">"}</button>
    </div>
  );
}
