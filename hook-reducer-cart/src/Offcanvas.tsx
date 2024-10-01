import { ComponentProps, ReactNode, useContext } from "react";
import { CartContext } from "./CartProvider";
import "./Offcanvas.css";
import { formatPrice } from "./ProductCard";

export function OffcanvasCart({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<"div">) {
  return (
    <div
      className="offcanvas offcanvas-end offcanvas-custom"
      data-bs-scroll="true"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      {...props}
    >
      {children}
    </div>
  );
}

OffcanvasCart.Title = Title;
OffcanvasCart.Body = Body;

function Title({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<"h5">) {
  const [cart, _] = useContext(CartContext);
  return (
    <div className="d-flex align-items-center justify-content-between">
      <h5 {...props}>{children}</h5>
      <span className="badge rounded-pill text-bg-success fs-6">
        {formatPrice(cart.total)}
      </span>
    </div>
  );
}

function Body() {
  const [cart, dispatch] = useContext(CartContext);
  return (
    <>
      <div className="offcanvas-col-names py-1">
        <div className="row gx-1">
          <div className="col-7 fw-medium">Item</div>
          <div className="col-2 fw-medium">Qty</div>
          <div className="col-3 fw-medium">Subtotal</div>
        </div>
      </div>
      <div className="offcanvas-body pt-0">
        {Object.values(cart.items).map((item) => (
          <div key={item.id} className="card mb-3">
            <div className="row g-0">
              <div className="col">
                <img
                  src={`${item.images[0]}`}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col">
                <div className="card-body d-flex flex-column h-100">
                  <p className="card-title">{item.title}</p>
                  <p className="card-subtitle">{item.category}</p>
                  <p className="card-text mt-auto">{formatPrice(item.price)}</p>
                </div>
              </div>
              <div className="col-2 card-body-padding">{item.quantity}</div>
              <div className="col-3 card-body-padding">
                {formatPrice(item.subtotal)}
              </div>
            </div>
            <div className="row justify-content-end gx-2 m-2">
              <div className="col-auto">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    dispatch({
                      type: "ADDITEM",
                      payload: { cartItem: { ...item, quantity: 1 } },
                    })
                  }
                >
                  Add
                </button>
              </div>

              <div className="col-auto">
                <button
                  className="col btn btn-danger"
                  onClick={() =>
                    dispatch({
                      type: "REMOVEITEM",
                      payload: { itemId: item.id },
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
