"use client";
import styles from "../../styling/Review.module.css";
import { FavoriteItem } from "../User/UserPage/UserInfo";

export default function ReviewForm() {
  return (
    <div className={styles.FormContainer}>
      <div className={styles.FormNameDate}></div>
      <div className={styles.Rate}></div>
      <div className={styles.Message}></div>
    </div>
  );
}
