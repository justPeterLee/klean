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
    setCart(JSON.parse(window.localStorage.getItem("cart")!));
  }, [window.localStorage.getItem("cart")]);
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
            context?.setCartState(false);
          }}
        >
          X
        </button>
      </div>

      <div className={styles.CartItemDisplay}>
        {cart ? (
          cart.map((item: any, index: number) => (
            <CartItem key={index} data={item} />
          ))
        ) : (
          <>no items</>
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
  };
}
function CartItem(props: CartItemProps) {
  const { data } = props;
  return (
    <div className={styles.CartItemContainer}>
      <span className={styles.ItemImage}>image</span>
      <div className={styles.ItemInfoContainer}>
        <div className={styles.Iteminfo}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.category}>Computer Mouse</span>
        </div>

        <div className={styles.ItemQuantity}>
          <button className={styles.ItemMinus}>-</button>
          <span className={styles.Quanity}>{data.quantity}</span>
          <button className={styles.ItemMinus}>+</button>
        </div>

        <div className={styles.MisButton}>
          <button className={styles.Remove}>{"[]"}</button>
          <button className={styles.Heart}>{"<3"}</button>
        </div>
      </div>

      <span className={styles.price}>$120.00</span>
    </div>
  );
}
