import { createContext, useState } from "react";
import { Product } from "./App";

export const CartContext = createContext<ReturnType<typeof useState<Cart>>>(
  null!,
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>([
    {
      id: 1,
      category: "Dairy",
      description: "Whole milk with 2% fat",
      title: "Nestle Whole Milk",
      price: 6,
    },
  ]);
  return (
    <CartContext.Provider
      value={[
        cart,
        setCart as unknown as React.Dispatch<
          React.SetStateAction<Cart | undefined>
        >,
      ]}
    >
      {children}
    </CartContext.Provider>
  );
}

type Cart = Pick<
  Product,
  "id" | "price" | "description" | "category" | "title"
>[];
