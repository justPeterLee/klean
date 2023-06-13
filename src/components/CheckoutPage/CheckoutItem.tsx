"use client";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import styles from "../../styling/Checkout.module.css";

export default function CheckoutItem() {
  const cartContext = useContext(CartContext);

  return (
    <div className={styles.ItemDisplay}>
      {cartContext?.cart ? (
        cartContext.cart.map((item: CartItem) => (
          <Item data={item} key={item.skuId} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

interface CartItem {
  id: number;
  skuId: number;
  image: string | null;
  name: string;
  category: string;
  price: number;
  quantity: number;
}
interface ItemProps {
  data: {
    id: number;
    skuId: number;
    image: string | null;
    name: string;
    category: string;
    price: number;
    quantity: number;
  };
}
function Item(props: ItemProps) {
  const { data } = props;
  const cartContext = useContext(CartContext);

  return (
    <div className={styles.ItemContainer}>
      <div className={styles.ImageContainer}>
        <span className={styles.Image}>image</span>
      </div>
      <div className={styles.InfoContainer}>
        <span className={styles.NameCategory}>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.category}>{data.category}</p>
        </span>
        <span className={styles.PriceContainer}>${data.price}</span>
        <span className={styles.QuantityContainer}>
          <button
            className={styles.quantityButton}
            onClick={() => {
              cartContext?.changeQuantity(data, false);
            }}
          >
            -
          </button>
          <span>{data.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => {
              cartContext?.changeQuantity(data, true);
            }}
          >
            +
          </button>
        </span>
      </div>
      <div className={styles.MisButtonContainer}>
        <button
          className={styles.MisButton}
          onClick={() => cartContext?.removeItem(data)}
        >
          []
        </button>
        <button className={styles.MisButton}>{"<3"}</button>
      </div>
    </div>
  );
}
