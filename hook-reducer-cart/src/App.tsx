import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/offcanvas.js";
import { ComponentProps, ReactNode, useEffect, useState } from "react";
import "./App.css";
import styles from "./App.module.css";

import { OffcanvasCart } from "./Offcanvas";

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
        ></Navbar.Button>
      </Navbar>
      <OffcanvasCart id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
        <OffcanvasCart.Header>
          <OffcanvasCart.Header.Title id="offcanvasCartLabel">
            My Cart
          </OffcanvasCart.Header.Title>
        </OffcanvasCart.Header>
        <OffcanvasCart.Body></OffcanvasCart.Body>
      </OffcanvasCart>
      <ProductsComponent />
    </>
  );
}

function Navbar({ children }: { children: ReactNode }) {
  return (
    <div role="navigation" className="navbar bg-light sticky-top">
      <div className="container-fluid">{children}</div>
    </div>
  );
}

Navbar.Button = Button;

function Button(props: ComponentProps<"button">) {
  return (
    <button
      className="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
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
    </button>
  );
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
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

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

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="col">
      <div className={`card h-100 ${styles["card"]}`}>
        <img
          src={product.thumbnail}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Price: ${product.price}</li>
          <li className="list-group-item">Rating: {product.rating}</li>
          <li className="list-group-item">Brand: {product.brand}</li>
        </ul>
      </div>
    </div>
  );
}
