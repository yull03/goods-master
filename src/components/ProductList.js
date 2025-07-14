import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const ProductList = ({ products, likedItems, onToggleLike }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // 반응형 ITEM 개수 설정
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(8);
      } else if (width < 1440) {
        setItemsPerPage(16);
      } else {
        setItemsPerPage(15);
      }
    };

    updateItemsPerPage(); // 처음 마운트 시
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [products, itemsPerPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="product-list">
      <div className="product-list__grid">
        {currentItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            liked={likedItems.some((item) => item.id === product.id)}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
