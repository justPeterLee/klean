"use client";
import styles from "../../styling/Cart.module.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../ClientContext";
import { CartContext } from "../Context/CartContext";
import { QuantityContext } from "../Context/ProductQuantity";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";
export default function Cart() {
  const router = useRouter();
  const context = useContext(MyContext);
  const cartContext = useContext(CartContext);
  const quantityContext = useContext(QuantityContext);

  const [quantity, setQuantity] = useState<any>({});

  useEffect(() => {
    if (context?.newCart) {
      context?.resetNewCartItem();
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
    <div
      className={`${styles.CartContainer} ${
        context?.cartActive && styles.CartActive
      }`}
    >
      <div className={styles.CartTitle}>
        <p>Your Cart</p>
        <button
          className={styles.Xbutton}
          onClick={() => {
            context?.toggleOff();
          }}
        >
          X
        </button>
      </div>

      <div className={styles.CartItemDisplay}>
        {context?.newCart && <NewCartItem data={context?.newCart} />}
        {cartContext?.cart && cartContext.cart.length ? (
          cartContext.cart.map((item: any, index: number) => (
            <CartItem
              key={item.skuId}
              data={item}
              changeCart={(newCart) => {
                cartContext?.changeCart(newCart);
              }}
              quantity={quantity[item.skuId]}
            />
          ))
        ) : cartContext?.loading ? (
          <div className={styles.NoItems}>loading... </div>
        ) : (
          <div className={styles.NoItems}>( No Items )</div>
        )}
      </div>

      <div className={styles.CartCheckout}>
        <div className={styles.TotalContainer}>
          <p>Total:</p>
          <p>${cartContext?.total}</p>
        </div>
        <button
          className={styles.CheckoutButton}
          onClick={() => {
            router.push("/checkout");
            context?.toggleOff();
          }}
        >
          checkout
        </button>
      </div>
    </div>
  );
}

interface NewCartItemProps {
  data: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string | null;
    skuId: number;
  };
}
function NewCartItem(props: NewCartItemProps) {
  const { data } = props;
  const [imageUrl, setImageUrl] = useState("");
  const fetchImageUrl = async () => {
    const res = await fetch(`/api/fetchImageProduct/${data.image}`).then(
      async (response) => {
        setImageUrl(await response.json());
      }
    );
  };
  useEffect(() => {
    fetchImageUrl();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: ".5rem",
      }}
    >
      <div
        className={styles.CartItemContainer}
        id={styles.NewInfoContainer}
        style={{ justifyContent: "left", gap: "1.9rem", height: "6rem" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            height={96}
            width={96}
            style={{ borderRadius: "10px" }}
          />
        ) : (
          <span
            className={styles.ItemImage}
            style={{ height: "6rem", width: "6rem" }}
          >
            loading...
          </span>
        )}

        <div className={styles.ItemInfoContainer} style={{ marginLeft: "0" }}>
          <div className={styles.Iteminfo}>
            <span className={styles.name}>{data.name}</span>
            <span className={styles.category}>{data.category}</span>
          </div>

          <span className={styles.price}>${data.price}</span>
        </div>

        <div className={styles.CheckMark}></div>
      </div>
    </div>
  );
}
