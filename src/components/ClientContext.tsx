"use client";
import { useState, useContext, createContext, FC } from "react";
import styles from "../styling/Cart.module.css";
import CartContextProvider from "./Context/CartContext";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface MyContextProps {
  cartActive: boolean;
  setCartState: any;
  toggleOff: () => void;
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

    if (JSON.parse(window.localStorage.getItem("newCartItem")!)) {
      window.localStorage.removeItem("newCartItem");
    }
  };
  return (
    <MyContext.Provider
      value={{
        cartActive: cartState,
        setCartState: setCartState,
        toggleOff: toggleOff,
      }}
    >
      <body
        className={inter.className}
        style={cartState ? { overflow: "hidden" } : {}}
      >
        <CartContextProvider>{children}</CartContextProvider>
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
