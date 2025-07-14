import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { GoBookmark } from "react-icons/go";

const ITEMS_PER_PAGE = 15;

const WishList = ({ likedItems, toggleLike, onCategorySelect }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // 찜 목록이 바뀔 때마다 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [likedItems]);

  const totalPages = Math.ceil(likedItems.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = likedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleGoToBest = () => {
    if (onCategorySelect) {
      onCategorySelect("best");  // selectedCategory 상태 변경
    }
    navigate("/category/best");   // best 카테고리 페이지로 이동
  };

  return (
    <div className="wishlist">
      <div className="wishlist__container">
        <h2>MY WISHLIST</h2>
        {likedItems.length > 0 ? (
          <>
            <div className="wishlist__grid">
              {currentItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  liked={true}
                  onToggleLike={toggleLike}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
                  <div className="empty-wish">
                    <GoBookmark className="mark-icon"/>
                    <h3>찜 목록 비어있어요</h3>
                    <p>새로운 상품으로 채워주세요</p>
                    <button onClick={handleGoToBest}>인기 상품 보러가기</button>
                  </div>
                )}
      </div>
    </div>
  );
};

export default WishList;