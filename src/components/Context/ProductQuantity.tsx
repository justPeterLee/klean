import { useState } from "react";
import { createContext } from "react";

export const QuantityContext = createContext<QuantityContextType | undefined>(
  undefined
);

interface QuantityContextType {
  productQuantity: any;
}
export default function QuantityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productQuantity, setProductQuantity] = useState({});

  return (
    <QuantityContext.Provider value={{ productQuantity: productQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
}
