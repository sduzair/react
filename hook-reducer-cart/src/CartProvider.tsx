import { createContext, Dispatch, Reducer, useReducer } from "react";
import { Product } from "./App";

export const CartContext = createContext<[Cart, Dispatch<CartActionType>]>(
  null!,
);

type CartActionType =
  | { type: "ADDITEM"; payload: { cartItem: CartItem } }
  | { type: "UPDATEITEM"; payload: { id: string; quantity: CartItem["id"] } }
  | { type: "REMOVEITEM"; payload: { itemId: CartItem["id"] } }
  | { type: "CLEAR" };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer<Reducer<Cart, CartActionType>>(
    (prevCart, action) => {
      switch (action.type) {
        case "ADDITEM":
          return {
            ...prevCart,
            items: {
              ...prevCart.items,
              [action.payload.cartItem.id]: {
                ...action.payload.cartItem,
                quantity:
                  (prevCart.items[action.payload.cartItem.id]?.quantity || 0) +
                  action.payload.cartItem.quantity,
                subtotal:
                  (prevCart.items[action.payload.cartItem.id]?.subtotal || 0) +
                  action.payload.cartItem.quantity *
                    action.payload.cartItem.price,
              },
            },
            total:
              prevCart.total +
              action.payload.cartItem.quantity * action.payload.cartItem.price,
            count: prevCart.count + action.payload.cartItem.quantity,
          };
        case "REMOVEITEM":
          const {
            items: { [action.payload.itemId]: _, ...updatedCart },
            total,
            count,
          } = prevCart;

          const removedItem = prevCart.items[action.payload.itemId];
          return {
            ...prevCart,
            items: updatedCart,
            total: total - removedItem.quantity * removedItem.price,
            count: count - removedItem.quantity,
          };
        case "UPDATEITEM":
          const prevItem = prevCart.items[action.payload.id];
          return {
            ...prevCart,
            items: {
              ...prevCart.items,
              [action.payload.id]: {
                ...prevItem,
                quantity: prevItem.quantity + action.payload.quantity,
                subtotal:
                  prevItem.subtotal + action.payload.quantity * prevItem.price,
              },
            },
            total: prevCart.total + action.payload.quantity * prevItem.price,
            quatity: prevCart.total + action.payload.quantity,
          };
        case "CLEAR":
          return { items: {}, total: 0, count: 0 };
        default:
          const _exhaustiveCheck: never = action;
          throw new Error(
            `Unhandled action type: ${(_exhaustiveCheck as any).type}`,
          );
      }
    },
    {
      items: {
        "12356": {
          id: 12356,
          price: 100,
          description: "duper great product",
          category: "Standard",
          title: "Milk .5L",
          quantity: 1,
          subtotal: 100,
          images: [
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
          ],
        },
        "1235": {
          id: 1235,
          price: 100,
          description: "duper great product",
          category: "Standard",
          title: "Milk .5L",
          quantity: 1,
          subtotal: 100,
          images: [
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
          ],
        },
        "12": {
          id: 12,
          price: 100,
          description: "duper great product",
          category: "Standard",
          title: "Milk .5L",
          quantity: 1,
          subtotal: 100,
          images: [
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
          ],
        },
        "123": {
          id: 123,
          price: 1000,
          description: "Super duper great product",
          category: "Premium",
          title: "Milk 2L",
          quantity: 1,
          subtotal: 1000,
          images: [
            "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
          ],
        },
      },
      total: 1300,
      count: 4,
    },
  );
  return (
    <CartContext.Provider value={[cart, dispatch]}>
      {children}
    </CartContext.Provider>
  );
}

type CartItem = Pick<
  Product,
  "id" | "price" | "description" | "category" | "title" | "images"
> & {
  quantity: number;
  subtotal: number;
};

export type Cart = {
  items: {
    [key: string]: CartItem;
  };
  total: number;
  count: number;
};
