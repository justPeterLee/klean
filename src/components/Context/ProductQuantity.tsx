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
  const [productQuantity, setProductQuantity] = useState({});
  const [url, setUrl] = useState(`/api/quantity`);

  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 180000,
  });

  useEffect(() => {
    if (window.localStorage.getItem("cart")) {
      if (JSON.parse(window.localStorage.getItem("cart")!)) {
        const proxyCart = JSON.parse(window.localStorage.getItem("cart")!).map(
          (item: any) => {
            return item.skuId;
          }
        );

        const quantityCart = { ids: proxyCart };
        setUrl(`/api/quantity?${queryString.stringify(quantityCart)}`);
      }
    }
  }, []);

  useEffect(() => {
    setProductQuantity(data);
  }, [data]);
  return (
    <QuantityContext.Provider value={{ productQuantity: productQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
}
