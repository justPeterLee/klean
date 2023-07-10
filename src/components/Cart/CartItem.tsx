"use client";

import { useState, useContext, useEffect } from "react";
import styles from "../../styling/Cart.module.css";
import { CartContext } from "../Context/CartContext";
import { FavoriteContext } from "../Context/FavoriteContext";
import { QuantityContext } from "../Context/ProductQuantity";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
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
  quantity: any;
}
export default function CartItem(props: CartItemProps) {
  const { data, changeCart } = props;

  const cartContext = useContext(CartContext);
  const favoriteContext = useContext(FavoriteContext);

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
      {data.image ? (
        <Image
          src={data.image}
          alt=""
          height={136}
          width={136}
          style={{ borderRadius: "10px" }}
        />
      ) : (
        <span className={styles.ItemImage}>image</span>
      )}
      <div className={styles.ItemInfoContainer}>
        <div className={styles.Iteminfo}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.category}>
            Computer Mouse {props.quantity}
          </span>
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
              if (props.quantity) {
                if (data.quantity < props.quantity) {
                  cartContext?.changeQuantity(data, true);
                }
              }
            }}
            disabled={data.quantity >= props.quantity}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.MisButton}>
        <button
          className={styles.Heart}
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
                  thumbnail: data.image,
                },
              });
            }
          }}
        >
          {favoriteContext?.favoriteFunc?.isFavorited(data.skuId) ? (
            !favoriteContext?.favorite[
              favoriteContext?.favoriteFunc?.getIndex(data.skuId, data.id)
            ].toBeDeleted ? (
              <AiFillHeart size={20} color="rgb(200,100,100)" />
            ) : (
              <AiOutlineHeart size={20} color="rgb(200,100,100)" />
            )
          ) : (
            <AiOutlineHeart size={20} color="black" />
          )}
        </button>

        <button
          className={styles.Remove}
          onClick={() => cartContext?.removeItem(data)}
        >
          <GoTrash size={20} />
        </button>
      </div>
    </div>
  );
}
