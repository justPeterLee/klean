"use client";

import { useState, useContext } from "react";
import styles from "../../styling/Cart.module.css";
import { CartContext } from "../Context/CartContext";
interface CartItemProps {
  data: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    skuId: number;
    quantity: number;
    remove?: boolean;
  };
  changeCart: (newCart: any) => void;
}
export default function CartItem(props: CartItemProps) {
  const { data, changeCart } = props;
  const cartContext = useContext(CartContext);

  const [removeAni, setRemoveAni] = useState(false);
  const offRemoveItem = () => {
    setRemoveAni(true);
    setTimeout(() => {
      const cartItems = JSON.parse(window.localStorage.getItem("cart")!);

      const updatedCart = cartItems
        .map((item: any) => {
          if (data.skuId !== item.skuId) {
            return item;
          }
        })
        .filter((item: any) => {
          if (item) {
            return item;
          }
        });

      changeCart(updatedCart);
    }, 300);
  };

  const addBackItem = () => {
    const cartItems = JSON.parse(window.localStorage.getItem("cart")!);

    const updatedCart = cartItems.map((item: any) => {
      if (data.skuId === item.skuId) {
        return { ...item, remove: false };
      } else {
        return item;
      }
    });

    changeCart(updatedCart);
  };

  return (
    <div
      className={`${styles.CartItemContainer} ${
        removeAni && styles.RemoveCartItem
      }`}
    >
      {data.remove && (
        <div className={styles.remove}>
          <p>remove</p>
          <div className={styles.RemoveButtonContainer}>
            <button className={styles.CancelRemove} onClick={addBackItem}>
              x
            </button>
            <button className={styles.OfficalRemove} onClick={offRemoveItem}>
              +
            </button>
          </div>
        </div>
      )}
      <span className={styles.ItemImage}>image</span>
      <div className={styles.ItemInfoContainer}>
        <div className={styles.Iteminfo}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.category}>Computer Mouse</span>
        </div>

        <span className={styles.price}>${data.quantity * data.price}</span>

        <div className={styles.ItemQuantity}>
          <button
            className={styles.ItemMinus}
            onClick={() => {
              cartContext?.changeQuantity(data, false);
            }}
          >
            -
          </button>
          <span className={styles.Quanity}>{data.quantity}</span>
          <button
            className={styles.ItemMinus}
            onClick={() => {
              cartContext?.changeQuantity(data, true);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.MisButton}>
        <button
          className={styles.Remove}
          onClick={() => cartContext?.removeItem(data)}
        >
          {"[]"}
        </button>
        <button className={styles.Heart}>{"<3"}</button>
      </div>
    </div>
  );
}
