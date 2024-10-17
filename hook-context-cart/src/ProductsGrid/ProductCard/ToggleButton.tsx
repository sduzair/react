import { useContext } from "react";
import { CartContext, CartDispatchContext, CartItem } from "../../CartProvider";

export default function ToggleButton({
  id,
  price,
  category,
  description,
  images,
  title,
}: Omit<CartItem, "subtotal" | "quantity">) {
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  if (cart.items[id] && cart.items[id].quantity > 0) {
    return (
      <div className="card-footer text-bg-primary align-content-center py-0">
        <div className="row w-100 align-items-center gx-2">
          <div className="col-auto">
            <InCartSvg />
          </div>
          <div className="col">In Cart</div>
          <div className="col-auto">
            <a
              role="button"
              className="btn btn-primary p-0 rounded-circle"
              onClick={() =>
                dispatch({
                  type: "UPDATEITEM",
                  payload: {
                    id,
                    qtyDelta: 1,
                  },
                })
              }
            >
              <PlusSvg />
            </a>
          </div>
          <div className="col-1 text-center">{cart.items[id].quantity}</div>
          <div className="col-auto">
            <a
              role="button"
              className="btn btn-primary p-0 rounded-circle"
              onClick={() =>
                dispatch({
                  type: "UPDATEITEM",
                  payload: {
                    id,
                    qtyDelta: -1,
                  },
                })
              }
            >
              <MinusSvg />
            </a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <a
      role="button"
      className="btn btn-success border-0 rounded-top-0 p-0"
      onClick={() =>
        dispatch({
          type: "ADDITEM",
          payload: {
            cartItem: {
              id,
              price,
              category,
              description,
              images,
              title,
              quantity: 1,
            },
          },
        })
      }
    >
      <div className="card-footer text-light align-content-center py-0">
        Add to Cart
      </div>
    </a>
  );
}

const InCartSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    className="bi"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"
    />
    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
  </svg>
);

const PlusSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
    </svg>
  );
};

const MinusSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
    </svg>
  );
};
