import { ComponentProps, ReactNode, useContext } from "react";
import { Cart, CartContext } from "./CartProvider";

export function OffcanvasCart({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<"div">) {
  return (
    <div
      className="offcanvas offcanvas-end offcanvasCustom"
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

OffcanvasCart.Header = Header;
Header.Title = Title;
OffcanvasCart.Body = Body;

function Header({ children }: { children: ReactNode } & ComponentProps<"div">) {
  return (
    <div className="offcanvas-header">
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
  );
}

function Title({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<"h5">) {
  return (
    <h5 className="offcanvas-title" {...props}>
      {children}
    </h5>
  );
}

function Body() {
  const [cart, setCart] = useContext(CartContext);
  return (
    <div className="offcanvas-body">
      {cart!.map((item) => (
        <div key={item.id} className="col">
          <div>{item.title}</div>
          <div>{item.description}</div>
          <div>{item.category}</div>
          <div>{item.price}</div>
        </div>
      ))}
      <button
        onClick={() =>
          setCart((prevCart: Cart | undefined) => [
            { ...prevCart![0], category: prevCart![0].category + "1" },
          ])
        }
      >
        Update Cart
      </button>
    </div>
  );
}
