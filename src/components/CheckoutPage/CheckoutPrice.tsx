"use client";
import styles from "../../styling/Checkout.module.css";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
export default function CheckoutPrice() {
  const cartContext = useContext(CartContext);
  return (
    <div className={styles.ReviewOrderContainer}>
      <div className={styles.CheckoutPriceContainer}>
        <p className={styles.ReviewTitle}>Order Review</p>
        <div className={styles.CalculateContainer}>
          <span className={styles.CalculateName}>
            <p>subtotal</p>
            <p>${cartContext?.total}</p>
          </span>
          <span className={styles.CalculateShipping}>
            <p>shipping</p>
            <p>...calculated at checkout</p>
          </span>
          <span className={styles.CalculateTaxes}>
            <p>taxes</p>
            <p>...calculated at checkout</p>
          </span>
        </div>

        <div className={styles.linebreak}></div>

        <div className={styles.TotalContainer}>
          <span className={styles.TotalContainerSub}>
            <p className={styles.TotalTitle}>total</p>
            <p className={styles.TotalNumber}>${cartContext?.total}</p>
          </span>
        </div>
      </div>

      <button className={styles.CheckoutButton}>checkout</button>
    </div>
  );
}
