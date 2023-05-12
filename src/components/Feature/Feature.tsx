"use client";
import styles from "./Feature.module.css";
import Menu from "./Menu/Menu";
export function MainFeature() {
  const readOption = (option: string) => {
    console.log(option);
  };

  return (
    <div className={styles.MainFeatureContainer}>
      <Menu options={["color1", "color2"]} readOption={readOption} />
      <button className={styles.viewProductButton}>view product</button>
    </div>
  );
}
