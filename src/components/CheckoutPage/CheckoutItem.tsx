"use client";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FavoriteContext } from "../Context/FavoriteContext";
import styles from "../../styling/Checkout.module.css";
import Image from "next/image";
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
  const favoriteContext = useContext(FavoriteContext);

  return (
    <div className={styles.ItemContainer}>
      <div className={styles.ImageContainer}>
        {data.image ? (
          <Image
            src={data.image}
            alt=""
            height={128}
            width={128}
            style={{ borderRadius: "10px" }}
          />
        ) : (
          <span className={styles.Image}>image</span>
        )}
      </div>
      <div className={styles.InfoContainer}>
        <span className={styles.NameCategory}>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.category}>{data.category}</p>
        </span>
        <span className={styles.PriceContainer}>
          ${data.price * data.quantity}
        </span>
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
          onClick={() => cartContext?.instantRemove(data)}
        >
          []
        </button>
        <button
          className={styles.MisButton}
          style={
            favoriteContext?.favoriteFunc?.isFavorited(data.skuId)
              ? !favoriteContext?.favorite[
                  favoriteContext?.favoriteFunc?.getIndex(data.skuId, data.id)
                ].toBeDeleted
                ? { background: "rgb(150,150,150)" }
                : {}
              : {}
          }
          onClick={() => {
            if (favoriteContext?.favoriteFunc?.isFavorited(data.skuId)) {
              if (
                favoriteContext?.favorite[
                  favoriteContext?.favoriteFunc?.getIndex(data.skuId, data.id)
                ].toBeDeleted === false
              ) {
                //proxy remove
                favoriteContext?.favoriteFunc?.proxyRemove(
                  data.skuId,
                  data.id,
                  false
                );
              } else {
                favoriteContext?.favoriteFunc?.proxyRemove(
                  data.skuId,
                  data.id,
                  true
                );
              }
            } else {
              favoriteContext?.favoriteFunc?.addProxyFav({
                id: Math.random(),
                productId: data.id,
                skuId: data.skuId,
                productData: {
                  name: data.name,
                  price: data.price,
                  category: data.category,
                  thumbnail: data.image!,
                },
              });
            }
          }}
        >
          {"<3"}
        </button>
      </div>
    </div>
  );
}
