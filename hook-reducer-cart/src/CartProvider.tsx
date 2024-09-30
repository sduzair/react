import { createContext, Dispatch, Reducer, useEffect, useReducer } from "react";
import { Product } from "./App";

export const CartContext = createContext<[Cart, Dispatch<CartActionType>]>(
  null!,
);

type CartActionType =
  | { type: "ADDITEM"; payload: { cartItem: CartItem } }
  | { type: "UPDATEITEM"; payload: { id: CartItem["id"]; quantity: number } }
  | { type: "REMOVEITEM"; payload: { itemId: CartItem["id"] } }
  | { type: "CLEAR" };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer<Reducer<Cart, CartActionType>, Cart>(
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
          return removeItemFromCart(action.payload.itemId, prevCart);
        case "UPDATEITEM":
          const prevItem = prevCart.items[action.payload.id];
          const newQuantity = Math.max(
            0,
            prevItem.quantity + action.payload.quantity,
          );
          const quantityDiff = newQuantity - prevItem.quantity;

          if (newQuantity === 0)
            return removeItemFromCart(action.payload.id, prevCart);

          return {
            ...prevCart,
            items: {
              ...prevCart.items,
              [action.payload.id]: {
                ...prevItem,
                quantity: prevItem.quantity + quantityDiff,
                subtotal: prevItem.subtotal + quantityDiff * prevItem.price,
              },
            },
            total: prevCart.total + action.payload.quantity * prevItem.price,
            count: prevCart.count + action.payload.quantity,
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
    null!,
    () => {
      const cart = localStorage.getItem("cart");
      if (!cart) {
        return {
          items: {},
          quantity: 0,
          count: 0,
        };
      }
      return JSON.parse(cart);
    },
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

function removeItemFromCart(itemId: CartItem["id"], prevCart: Cart) {
  const {
    items: { [itemId]: _, ...updatedCart },
    total,
    count,
  } = prevCart;

  const removedItem = prevCart.items[itemId];
  return {
    ...prevCart,
    items: updatedCart,
    total: total - removedItem.quantity * removedItem.price,
    count: count - removedItem.quantity,
  };
}
