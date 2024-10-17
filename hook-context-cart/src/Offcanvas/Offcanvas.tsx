import { ComponentProps, ReactNode, useContext } from "react";
import { CartContext } from "../CartProvider";
import "./Offcanvas.css";
import { CartItemCard } from "./CartItemCard";
import Title from "./Title";

function Body() {
  const cart = useContext(CartContext);
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
          <CartItemCard key={item.id} {...item}>
            <CartItemCard.AddItemButton {...item}></CartItemCard.AddItemButton>
            <CartItemCard.RemoveItemButton
              itemId={item.id}
            ></CartItemCard.RemoveItemButton>
          </CartItemCard>
        ))}
      </div>
    </>
  );
}

export function OffcanvasCart({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<"div">) {
  return (
    <div
      className="offcanvas offcanvas-end offcanvas-custom"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      {...props}
    >
      {children}
    </div>
  );
}

OffcanvasCart.Body = Body;
OffcanvasCart.Title = Title;
