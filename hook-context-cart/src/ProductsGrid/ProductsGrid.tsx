import { useEffect, useState } from "react";
import type { Product, ProductsWithPagination } from "../App";
import { ProductCard } from "./ProductCard/ProductCard";

export default function ProductsGrid() {
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
          <ProductCard key={product.id} {...product}>
            <ProductCard.Body
              title={product.title}
              brand={product.brand}
              description={product.description}
              price={product.price}
            >
              <ProductCard.Body.StarRating rating={product.rating} />
            </ProductCard.Body>
            <ProductCard.ToggleButton {...product}></ProductCard.ToggleButton>
          </ProductCard>
        ))}
      </div>
    </div>
  );
}
