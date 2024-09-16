import { useContext } from "react";
import { CartContext } from "./CartProvider";

export function Offcanvas() {
  const [cart, setCart] = useContext(CartContext);
  return (
    <div
      className="offcanvas offcanvas-end offcanvasCustom"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabIndex={-1}
      id="offcanvasCart"
      aria-labelledby="offcanvasCartLabel"
      aria-modal="true"
      role="dialog"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasCartLabel">
          My Cart
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {cart?.map((item) => (
          <div key={item.id} className="col">
            <div>{item.title}</div>
            <div>{item.description}</div>
            <div>{item.category}</div>
            <div>{item.price}</div>
          </div>
        ))}
        <button
          onClick={() =>
            setCart((prevCart) => [
              { ...prevCart![0], category: prevCart![0].category + "1" },
            ])
          }
        >
          Update Cart
        </button>
      </div>
    </div>
  );
}
