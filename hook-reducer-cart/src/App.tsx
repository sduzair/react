import "bootstrap/js/src/collapse.js";
import "bootstrap/js/src/offcanvas.js";
import "./App.css";
import Navbar from "./Navbar";
import { OffcanvasCart } from "./Offcanvas/Offcanvas";
import ProductsGrid from "./ProductsGrid/ProductsGrid";

export default function App() {
  return (
    <>
      <Navbar>
        <Navbar.ToggleCartButton
          data-bs-target="#offcanvasCart"
          aria-controls="offcanvasCart"
          data-bs-toggle="offcanvas"
        ></Navbar.ToggleCartButton>
      </Navbar>
      <OffcanvasCart id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
        <div className="offcanvas-header">
          <div className="col">
            <OffcanvasCart.Title
              id="offcanvasCartLabel"
              className="offcanvas-title"
            >
              <OffcanvasCart.Title.Total />
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
      <ProductsGrid />
    </>
  );
}

export type ProductsWithPagination = {
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
