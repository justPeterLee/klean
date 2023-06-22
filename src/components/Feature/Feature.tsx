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
      <Menu
        options={["color1", "color2", "color3"]}
        readOption={readOption}
        selected={optionSelected}
        containerStyle={{ top: "1rem", left: "1rem" }}
      />
      <button className={styles.viewProductButton}>view product</button>
    </div>
  );
}

interface SideFeatureProps {
  product_info: {
    id: number;
    name: string;
    description: string;
    image?: string;
  };
  styling?: {
    featureBackgroundColor?: string;
    lineColor?: string;
    productInfoTop?: string;
    productInfoLeft?: string;
    buttonPostionTop?: string;
    buttonPostionLeft?: string;
  };
}
export function SideFeature(props: SideFeatureProps) {
  const { product_info, styling } = props;
  return (
    <div
      className={styles.SideFeatureContainer}
      style={{
        backgroundColor: styling?.featureBackgroundColor,
        color: styling?.lineColor,
      }}
    >
      <div
        className={styles.SideFeatureInfo}
        style={{ top: styling?.productInfoTop, left: styling?.productInfoLeft }}
      >
        <p className={styles.SideTitle}>{product_info.name}</p>
        <p className={styles.SideDesc}>{product_info.description}</p>
      </div>
      <button
        className={styles.SideButton}
        style={{
          top: styling?.buttonPostionTop,
          left: styling?.buttonPostionLeft,
        }}
      >
        see details
      </button>
    </div>
  );
}

export function ContactButton() {
  return <button className={styles.contactButton}>contact us</button>;
}
