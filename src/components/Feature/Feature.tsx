"use client";
import styles from "./Feature.module.css";
import Menu from "./Menu/Menu";
export function MainFeature() {
  return (
    <div className={styles.MainFeatureContainer}>
      <Menu />
      <button className={styles.viewProductButton}>view product</button>
    </div>
  );
}
