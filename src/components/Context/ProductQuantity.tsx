"use client";
import { useState, useEffect } from "react";
import { createContext } from "react";
import useSWR from "swr";
import queryString from "query-string";

export const QuantityContext = createContext<QuantityContextType | undefined>(
  undefined
);

interface QuantityContextType {
  productQuantity: any;
}

async function fetcher(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}

export default function QuantityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [url, setUrl] = useState(`/api/quantity`);
  const [payload, setPayload] = useState({});

  if (payload) {
    const { data, error } = useSWR(url, fetcher);
  }

  const [productQuantity, setProductQuantity] = useState({});
  // get current cart
  const fetchCurrentQuantity = () => {};

  useEffect(() => {
    const proxyCart = JSON.parse(window.localStorage.getItem("cart")!).map(
      (item: any) => {
        return item.skuId;
      }
    );

    const quantityCart = { ids: proxyCart };
    console.log(queryString.stringify(quantityCart));
    setUrl(`/api/quantity?${queryString.stringify(quantityCart)}`);
  }, []);
  return (
    <QuantityContext.Provider value={{ productQuantity: productQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
}
