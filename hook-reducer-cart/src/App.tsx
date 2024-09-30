import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/offcanvas.js";
import {
  ComponentProps,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import "./App.css";
import styles from "./App.module.css";

import { CartContext } from "./CartProvider";
import { formatPrice, OffcanvasCart } from "./Offcanvas";

function App() {
  return (
    <>
      <Navbar>
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <Navbar.Button
          data-bs-target="#offcanvasCart"
          aria-controls="offcanvasCart"
          data-bs-toggle="offcanvas"
        ></Navbar.Button>
      </Navbar>
      <OffcanvasCart id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
        <div className="offcanvas-header">
          <div className="col">
            <OffcanvasCart.Title
              id="offcanvasCartLabel"
              className="offcanvas-title"
            >
              My Cart
            </OffcanvasCart.Title>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <OffcanvasCart.Body></OffcanvasCart.Body>
      </OffcanvasCart>
      <ProductsComponent />
    </>
  );
}

function Navbar({ children }: { children: ReactNode }) {
  return (
    <div role="navigation" className="navbar bg-body sticky-top border-bottom">
      <div className="container-fluid">{children}</div>
    </div>
  );
}

Navbar.Button = Button;

function Button(props: ComponentProps<"button">) {
  const [cart, _] = useContext(CartContext);
  return (
    <button
      className="btn btn-primary position-relative m-1 mx-2"
      type="button"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi"
        viewBox="0 0 16 16"
      >
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
      </svg>

      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {formatCountForCartBadge(cart.count)}
        <span className="visually-hidden">unread messages</span>
      </span>
    </button>
  );
}

function formatCountForCartBadge(count: number) {
  if (count > 10) return "10+";
  return `${count}`;
}

function ProductsComponent() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then<ProductsWithPagination>((res) => res.json())
      .then((productsWithMetadata) => {
        setProducts(productsWithMetadata.products);
      });
  }, []);

  return (
    <div className="container-fluid container-lg mt-4 mb-4">
      <div className="row row-cols-auto row-cols-sm-2 row-cols-lg-4 g-2 g-lg-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="col">
      <div className={`card h-100 ${styles["card"]} ${styles["card-border"]}`}>
        <img
          src={product.thumbnail}
          className={`card-img-top mx-auto ${styles["card-img"]}`}
          alt={product.title}
        />
        <div className="card-body">
          <h5 className={`card-title ${styles["card-title"]}`}>
            {product.title}
          </h5>
          <h6
            className={`card-subtitle mb-2 ${styles["cart-subtitle"]}`}
          >
            {product.brand}
          </h6>
          <p className="card-text">{product.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-end">
            Price: {formatPrice(product.price)}
          </li>
          <li className="list-group-item text-end">
            <StarRating rating={product.rating} />
          </li>
        </ul>
      </div>
    </div>
  );
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const maxStars = 5;

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        style={{ color: i <= rating ? "#ffd700" : "#e4e5e9" }}
        className={`${styles["rating-star"]}`}
      >
        ★
      </span>,
    );
  }

  return <div>{stars}</div>;
};

type ProductsWithPagination = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
};

type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export default App;
