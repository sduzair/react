import {
  createContext,
  Dispatch,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { Product } from "./App";

export const CartContext = createContext<Cart>(null!);

export const CartDispatchContext = createContext<Dispatch<CartActionType>>(
  null!,
);

type CartActionType =
  | { type: "ADDITEM"; payload: { cartItem: Omit<CartItem, "subtotal"> } }
  | { type: "UPDATEITEM"; payload: { id: CartItem["id"]; qtyDelta: number } }
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
        case "UPDATEITEM": {
          const prevItem = prevCart.items[action.payload.id];
          const newQuantity = Math.max(
            0,
            prevItem.quantity + action.payload.qtyDelta,
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
            total: prevCart.total + action.payload.qtyDelta * prevItem.price,
            count: prevCart.count + action.payload.qtyDelta,
          };
        }
        case "CLEAR":
          return { items: {}, quantity: 0, total: 0, count: 0 };
        default: {
          const _exhaustiveCheck: never = action;
          throw new Error(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            `Unhandled action type: ${(_exhaustiveCheck as any).type}`,
          );
        }
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
          total: 0,
        };
      }
      return JSON.parse(cart);
    },
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatchMemo = useCallback(dispatch, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatchMemo}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export type CartItem = Pick<
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
    items: { [itemId]: removedItem, ...updatedCart },
    total,
    count,
  } = prevCart;

  return {
    ...prevCart,
    items: updatedCart,
    total: total - removedItem.quantity * removedItem.price,
    count: count - removedItem.quantity,
  };
}
