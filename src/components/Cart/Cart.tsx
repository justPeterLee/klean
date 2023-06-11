"use client";
import styles from "../../styling/Cart.module.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../ClientContext";

/*
cart item data
- product id (parent)
  - price 
  - name 
  - product page naviagtion
  - image

- sku id 
  - quanity
  -specific id
*/

/*
cart logic 

- will cart move to server when user is logged in 
  - save cart token 
  - store cart in cookie 
  - when user is logged in add cart item to user page 

- delete item
  - remove item from cart
  - update price

- favorite item 
  - must be logged in 
  - item sent to user favorite list 

- increase quanity
  - increase price 
  - check if quanity is in stock

- decrease quanity
  - decrease price 

- navigate to checkout page
*/

export default function Cart() {
  const context = useContext(MyContext);
  const [cart, setCart] = useState<any[] | null>(
    JSON.parse(window.localStorage.getItem("cart")!)
  );
  useEffect(() => {
    // window.localStorage.setItem("cart", JSON.stringify(null));
    setCart(JSON.parse(window.localStorage.getItem("cart")!));
  }, [window.localStorage.getItem("cart")]);

  const [newCartItem, setNewCartItem] = useState(
    JSON.parse(window.localStorage.getItem("newCartItem")!)
  );
  useEffect(() => {
    setNewCartItem(JSON.parse(window.localStorage.getItem("newCartItem")!));
  }, [window.localStorage.getItem("newCartItem")]);

  useEffect(() => {
    setNewCartItem(null);

    window.localStorage.removeItem("newCartItem");
  }, []);
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
        {newCartItem && <NewCartItem data={newCartItem} />}
        {cart && cart.length ? (
          cart.map((item: any, index: number) => (
            <CartItem
              key={index}
              data={item}
              changeQuantity={(newCart: any) => {
                window.localStorage.setItem("cart", JSON.stringify(newCart));
                const updatedCart: any = window.localStorage.getItem("cart");
                setCart(JSON.parse(updatedCart));
              }}
            />
          ))
        ) : (
          <div className={styles.NoItems}>( No Items )</div>
        )}
      </div>

      <div className={styles.CartCheckout}>
        <button className={styles.CheckoutButton}>checkout</button>
      </div>
    </div>
  );
}

interface CartItemProps {
  data: {
    id: number;
    name: string;
    price: number;
    image: string;
    skuId: number;
    quantity: number;
    remove?: boolean;
  };
  changeQuantity: (newCart: any) => void;
}
function CartItem(props: CartItemProps) {
  const { data, changeQuantity } = props;

  const quanityChange = (add: boolean) => {
    const cartItems = JSON.parse(window.localStorage.getItem("cart")!);

    const updatedCart = cartItems
      .map((item: any) => {
        if (data.skuId === item.skuId) {
          if (add) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            if (item.quantity - 1 > 0) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return { ...item, quantity: 1, remove: true };
            }
          }
        } else {
          return item;
        }
      })
      .filter((item: any) => {
        if (item) {
          return item;
        }
      });

    changeQuantity(updatedCart);
  };

  const removeItem = () => {
    const cartItems = JSON.parse(window.localStorage.getItem("cart")!);

    const updatedCart = cartItems.map((item: any) => {
      if (data.skuId === item.skuId) {
        return { ...item, remove: true };
      } else {
        return item;
      }
    });
    changeQuantity(updatedCart);
  };

  return (
    <div className={styles.CartItemContainer}>
      {data.remove && (
        <div className={styles.remove}>
          <p>remove</p>
          <div className={styles.RemoveButtonContainer}>
            <button className={styles.CancelRemove}>x</button>
            <button className={styles.OfficalRemove}>+</button>
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
              quanityChange(false);
            }}
          >
            -
          </button>
          <span className={styles.Quanity}>{data.quantity}</span>
          <button
            className={styles.ItemMinus}
            onClick={() => {
              quanityChange(true);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.MisButton}>
        <button className={styles.Remove} onClick={removeItem}>
          {"[]"}
        </button>
        <button className={styles.Heart}>{"<3"}</button>
      </div>
    </div>
  );
}

interface NewCartItemProps {
  data: {
    id: number;
    name: string;
    price: number;
    image: string;
    skuId: number;
  };
}
function NewCartItem(props: NewCartItemProps) {
  const { data } = props;

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
        <span
          className={styles.ItemImage}
          style={{ height: "6rem", width: "6rem" }}
        >
          image
        </span>
        <div className={styles.ItemInfoContainer} style={{ marginLeft: "0" }}>
          <div className={styles.Iteminfo}>
            <span className={styles.name}>{data.name}</span>
            <span className={styles.category}>Computer Mouse</span>
          </div>

          <span className={styles.price}>${data.price}</span>
        </div>

        <div className={styles.CheckMark}></div>
      </div>
    </div>
  );
}
