import { memo, useContext } from "react";
import { CartDispatchContext, CartItem } from "../CartProvider";
import { formatPrice } from "../utility";

function AddItemButton(props: CartItem) {
  const dispatchMemo = useContext(CartDispatchContext);
  return (
    <div className="col-auto">
      <button
        className="btn btn-primary cs-fs"
        onClick={() =>
          dispatchMemo({
            type: "ADDITEM",
            payload: {
              cartItem: { ...props, quantity: 1 },
            },
          })
        }
      >
        Add
      </button>
    </div>
  );
}

const RemoveItemButton = memo(({ itemId }: { itemId: number }) => {
  const dispatchMemo = useContext(CartDispatchContext);
  return (
    <div className="col-auto">
      <button
        className="col btn btn-danger cs-fs"
        onClick={() =>
          dispatchMemo({
            type: "REMOVEITEM",
            payload: {
              itemId,
            },
          })
        }
      >
        Remove
      </button>
    </div>
  );
});

export const CartItemCard = ({
  children,
  ...cartItem
}: CartItem & {
  children: React.ReactNode;
}) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col">
          <img
            src={`${cartItem.images[0]}`}
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col">
          <div className="card-body d-flex flex-column h-100">
            <p className="card-title">{cartItem.title}</p>
            <p className="card-subtitle category">{cartItem.category}</p>
            <p className="card-text mt-auto">{formatPrice(cartItem.price)}</p>
          </div>
        </div>
        <div className="col-2 card-body-padding">{cartItem.quantity}</div>
        <div className="col-3 card-body-padding">
          {formatPrice(cartItem.subtotal)}
        </div>
      </div>
      <div className="row justify-content-end gx-2 m-2">{children}</div>
    </div>
  );
};

CartItemCard.AddItemButton = AddItemButton;
CartItemCard.RemoveItemButton = RemoveItemButton;
