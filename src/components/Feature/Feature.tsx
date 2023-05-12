"use client";
import styles from "./Feature.module.css";

export function MainFeature() {
  return (
    <div className={styles.MainFeatureContainer}>
      <button className={styles.viewProductButton}>view product</button>
    </div>
  );
}
