import { useState, useMemo, useEffect } from "react";
import ProductList from "./ProductList";

export default function CategoryApp({ selectedCategory, likedItems, toggleLike }) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/asset/sub.json`)
      .then((response) => response.json())
      .then((data) => setAllProducts(data));
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return allProducts;
    }
    if (selectedCategory === "best") {
      return allProducts.filter((p) => p.isBest);
    }
    if (!selectedCategory) return [];
    return allProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, allProducts]);

  return (
    <div className="category-app">
      <div className="category-app__container">
        <main className="category-app__main">
          <h2>{selectedCategory?.toUpperCase()}</h2>
          {filteredProducts.length > 0 && (
            <ProductList
              products={filteredProducts}
              likedItems={likedItems}
              onToggleLike={toggleLike}
            />
          )}
        </main>
      </div>
    </div>
  );
}