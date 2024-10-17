import { ReactNode } from "react";
import { Product } from "../../App";
import { formatPrice } from "../../utility";
import "./ProductCard.css";
import ToggleButton from "./ToggleButton";

const StarRating = ({ rating }: { rating: number }) => {
  const maxStars = 5;
  const stars = Array.from({ length: maxStars }, (_, i) => (
    <span
      key={i + 1}
      style={{ color: i + 1 <= rating ? "#ffd700" : "#e4e5e9" }}
      className="rating-star"
    >
      ★
    </span>
  ));

  return <div>{stars}</div>;
};

const Body = ({
  children,
  ...props
}: Pick<Product, "title" | "brand" | "description" | "price"> & {
  children: ReactNode;
}) => {
  return (
    <div className="card-body d-flex flex-column justify-content-between pb-0">
      <h5 className="card-title">{props.title}</h5>
      <h6 className="card-subtitle mb-2">{props.brand}</h6>
      <p className="card-text mb-auto">{props.description}</p>
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-end price">
          Price: {formatPrice(props.price)}
        </li>
        <li className="list-group-item text-end">{children}</li>
      </ul>
    </div>
  );
};

Body.StarRating = StarRating;

export const ProductCard = ({
  thumbnail,
  title,
  children,
}: Pick<
  Product,
  "thumbnail" | "title" | "brand" | "description" | "price" | "rating"
> & {
  children: ReactNode;
}) => {
  return (
    <div className="col">
      <div className="card h-100 cs-card">
        <img
          src={thumbnail}
          className="card-img card-img-top mx-auto"
          alt={title}
        />
        {children}
      </div>
    </div>
  );
};

ProductCard.Body = Body;
ProductCard.ToggleButton = ToggleButton;
