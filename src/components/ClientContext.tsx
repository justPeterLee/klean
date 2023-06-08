"use client";
import { useState, useContext, createContext, FC } from "react";
import styles from "../styling/Cart.module.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface MyContextProps {
  cartActive: boolean;
  setCartState: any;
}

export const MyContext = createContext<MyContextProps | undefined>(undefined);

export default function ClientContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartState, setCartState] = useState(false);
  return (
    <MyContext.Provider
      value={{ cartActive: cartState, setCartState: setCartState }}
    >
      <body
        className={inter.className}
        style={cartState ? { overflow: "hidden" } : {}}
      >
        {children}
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
        context?.setCartState(false);
      }}
    ></div>
  );
}