"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { MyContext } from "../ClientContext";
interface CartContext {
  cart: CartItem[] | null;
  total: number;
  // getCart: () => void;
  changeCart: (newCart: CartItem[]) => void;
  changeQuantity: (item: CartItem, add: boolean) => void;
  removeItem: (item: CartItem) => void;
  instantRemove: (curItem: CartItem) => void;
  initalCart: () => void;
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

interface NewCartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  skuId: number;
}
export const CartContext = createContext<CartContext | undefined>(undefined);

/*
- get cart
- change quantity 
- remove item
*/
export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(MyContext);

  const [cart, setCart] = useState<CartItem[] | null>(null);

  const [total, setTotal] = useState<number>(0);

  const fetchImageUrl = async (imageKey: string) => {
    const res = await fetch(`/api/fetchImageProduct/${imageKey}`);
    return await res.json();
  };

  const changeCart = async (newCart: CartItem[]) => {
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    const proxyCart = JSON.parse(window.localStorage.getItem("cart")!);

    const proxy = await Promise.all(
      proxyCart.map(async (item: CartItem) => {
        let imageUrl = "";
        if (item.image) {
          imageUrl = await fetchImageUrl(item.image);
        }
        return { ...item, image: imageUrl };
      })
    );
    setCart(proxy);
    updateTotal();
  };

  const changeQuantity = (curItem: CartItem, add: boolean) => {
    const cartItems = JSON.parse(window.localStorage.getItem("cart")!);

    const updatedCart = cartItems.map((item: any) => {
      if (curItem.skuId === item.skuId) {
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
    });

    changeCart(updatedCart);
  };

  const removeItem = (curItem: CartItem) => {
    const cartItems = JSON.parse(window.localStorage.getItem("cart")!);

    const updatedCart = cartItems.map((item: any) => {
      if (curItem.skuId === item.skuId) {
        return { ...item, remove: true };
      } else {
        return item;
      }
    });
    changeCart(updatedCart);
  };

  const instantRemove = (curItem: CartItem) => {
    const cartItems = JSON.parse(window.localStorage.getItem("cart")!);

    const updatedCart = cartItems
      .map((item: CartItem) => {
        if (curItem.skuId !== item.skuId) {
          return item;
        }
      })
      .filter((item: CartItem | undefined) => {
        if (item) {
          return item;
        }
      });
    changeCart(updatedCart);
  };

  async function initalCart() {
    const proxyCart = JSON.parse(window.localStorage.getItem("cart")!);

    const proxy = await Promise.all(
      proxyCart.map(async (item: CartItem) => {
        let imageUrl = "";
        if (item.image) {
          imageUrl = await fetchImageUrl(item.image);
        }
        return { ...item, image: imageUrl };
      })
    );

    setCart(proxy);
    updateTotal();
  }

  function updateTotal() {
    const cart = JSON.parse(window.localStorage.getItem("cart")!);
    let total = 0;
    cart.map((item: any) => {
      total += item.quantity * item.price;
    });
    setTotal(total);
  }
  useEffect(() => {
    initalCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        total: total,
        // getCart: getCart,
        changeCart: changeCart,
        changeQuantity: changeQuantity,
        removeItem: removeItem,
        instantRemove: instantRemove,
        initalCart: initalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
