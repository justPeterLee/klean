"use client";
import { useEffect, useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { FavoriteContext } from "../Context/FavoriteContext";
import { QuantityContext } from "../Context/ProductQuantity";
import styles from "../../styling/Checkout.module.css";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
export default function CheckoutItem() {
  const cartContext = useContext(CartContext);
  const quantityContext = useContext(QuantityContext);
  const [quantity, setQuantity] = useState<any>({});
  useEffect(() => {
    if (!cartContext?.cart) {
      cartContext?.initalCart();
    }
  }, []);

  useEffect(() => {
    if (quantityContext?.productQuantity) {
      if (Object.keys(quantityContext.productQuantity)) {
        setQuantity(quantityContext.productQuantity);
      }
    }
  }, [quantityContext?.productQuantity]);
  return (
    <div className={styles.ItemDisplay}>
      {cartContext?.cart ? (
        cartContext.cart.map((item: CartItem) => (
          <Item data={item} key={item.skuId} quantity={quantity[item.skuId]} />
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
  quantity: any;
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
        </span>
      </div>
      <div className={styles.MisButtonContainer}>
        <button
          className={styles.MisButton}
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
          className={styles.MisButton}
          onClick={() => cartContext?.instantRemove(data)}
        >
          <GoTrash size={20} />
        </button>
      </div>
    </div>
  );
}
