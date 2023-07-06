"use client";
import { useState, useContext, createContext, FC } from "react";
import styles from "../styling/Cart.module.css";
import CartContextProvider from "./Context/CartContext";
import FavoriteContextProvider from "./Context/FavoriteContext";
import { Inter } from "next/font/google";

import dynamic from "next/dynamic";
const Cart = dynamic(() => import("@/components/Cart/Cart"));

const inter = Inter({ subsets: ["latin"] });

interface MyContextProps {
  cartActive: boolean;
  setCartState: any;
  newCart: NewCartItem | null;
  toggleOff: () => void;
  getNewCartItem: (newItem: NewCartItem) => void;
  resetNewCartItem: () => void;
}

interface NewCartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string | null;
  skuId: number;
}

export const MyContext = createContext<MyContextProps | undefined>(undefined);

export default function ClientContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartState, setCartState] = useState(false);

  const toggleOff = () => {
    setCartState(false);

    resetNewCartItem();
  };

  const [newCartItem, setNewCartItem] = useState(null);

  const getNewCartItem = (data: any) => {
    setNewCartItem(data);
  };

  const resetNewCartItem = () => {
    setNewCartItem(null);
  };

  return (
    <MyContext.Provider
      value={{
        cartActive: cartState,
        setCartState: setCartState,
        toggleOff: toggleOff,

        newCart: newCartItem,

        getNewCartItem: getNewCartItem,
        resetNewCartItem: resetNewCartItem,
      }}
    >
      <body
        className={inter.className}
        style={cartState ? { overflow: "hidden" } : {}}
      >
          <CartContextProvider>
            {/* {cartState && <Cart />} */}
            {children}
          </CartContextProvider>
      </body>
    </MyContext.Provider>
  );
}

export function BackDrop() {
  const context = useContext(MyContext);
  return (
    <div
      className={`${styles.BackDrop} ${
        context?.cartActive && styles.ActiveBackDrop
      }`}
      onClick={() => {
        context?.toggleOff();
      }}
    ></div>
  );
}
