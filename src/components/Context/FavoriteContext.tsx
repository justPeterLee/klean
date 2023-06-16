"use client";
import { useContext, createContext, useState, useEffect } from "react";

export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

interface FavoriteContextType {}

export default function FavoriteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FavoriteContext.Provider value={""}>{children}</FavoriteContext.Provider>
  );
}
