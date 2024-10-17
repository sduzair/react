import { useContext, ReactNode, ComponentProps } from "react";
import { CartContext } from "../CartProvider";
import { formatPrice } from "../utility";

const Total = () => {
  const cart = useContext(CartContext);
  return <>{formatPrice(cart.total)}</>;
};

export default function Title({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<"h5">) {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <h5 {...props}>My Cart</h5>
      <span className="badge rounded-pill text-bg-success fs-6">
        {children}
      </span>
    </div>
  );
}

Title.Total = Total;
