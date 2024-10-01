import { Product } from "./App";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="col">
      <div className="card h-100 cs-card">
        <img
          src={product.thumbnail}
          className="card-img card-img-top mx-auto"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <h6 className="card-subtitle mb-2">{product.brand}</h6>
          <p className="card-text">{product.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-end price">
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
        className="rating-star"
      >
        ★
      </span>,
    );
  }

  return <div>{stars}</div>;
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
