"use client";
import { useContext, createContext, useState, useEffect } from "react";

interface CartContext {
  cart: CartItem[] | null;
  getCart: () => void;
  changeCart: (newCart: CartItem[]) => void;
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
  const [cart, setCart] = useState<CartItem[] | null>(
    JSON.parse(window.localStorage.getItem("cart")!)
  );

  const getCart = () => {
    setCart(JSON.parse(window.localStorage.getItem("cart")!));
  };

  const changeCart = (newCart: CartItem[]) => {
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(JSON.parse(window.localStorage.getItem("cart")!));
  };

  useEffect(() => {
    setCart(JSON.parse(window.localStorage.getItem("cart")!));
  }, [window.localStorage.getItem("cart")]);

  return (
    <CartContext.Provider
      value={{ cart: cart, getCart: getCart, changeCart: changeCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
