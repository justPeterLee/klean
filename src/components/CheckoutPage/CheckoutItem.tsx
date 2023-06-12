"use client";
import { useEffect, useState } from "react";
import styles from "../../styling/Checkout.module.css";

export default function CheckoutItem() {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[] | null>(
    JSON.parse(window.localStorage.getItem("cart")!)
  );

  useEffect(() => {
    setCheckoutItems(JSON.parse(window.localStorage.getItem("cart")!));
  }, [window.localStorage.getItem("cart")]);
  return (
    <div className={styles.ItemDisplay}>
      {checkoutItems ? (
        checkoutItems.map((item: CartItem) => (
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

  return (
    <div className={styles.ItemContainer}>
      <div className={styles.ImageContainer}>
        <span className={styles.Image}>image</span>
      </div>
      <div className={styles.InfoContainer}>
        <span className={styles.NameCategory}>
          <p>{data.name}</p>
          <p>{data.category}</p>
        </span>
        <span className={styles.PriceContainer}>{data.price}</span>
        <span className={styles.QuantityContainer}>
          <button>-</button>
          <span>{data.quantity}</span>
          <button>+</button>
        </span>
      </div>
      <div className={styles.MisButtonContainer}>
        <button className={styles.MisButton}>[]</button>
        <button className={styles.MisButton}>{"<3"}</button>
      </div>
    </div>
  );
}
