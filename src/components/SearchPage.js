import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Pagination from "./Pagination";

const SearchPage = ({ likedItems = [], toggleLike }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");
  const [appliedPrice, setAppliedPrice] = useState("");

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(12); // 기본값 설정
  const [currentPage, setCurrentPage] = useState(1);

  // 모바일 전용: 필터 토글 상태
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // 상품 데이터 불러오기
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/asset/sub.json`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 필터 적용된 상품 목록 갱신
  useEffect(() => {
    let result = products;

    if (query) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (appliedCategory) {
      result = result.filter((p) => p.category === appliedCategory);
    }

    if (appliedPrice) {
      const priceRanges = {
        1: [0, 5000],
        2: [5000, 10000],
        3: [10000, 20000],
        4: [20000, 30000],
        5: [30000, Infinity],
      };
      const [min, max] = priceRanges[appliedPrice];
      result = result.filter((p) => p.price >= min && p.price < max);
    }

    setFiltered(result);
  }, [query, products, appliedCategory, appliedPrice]);

  // 실시간 필터링 된 상품 (필터 적용 전)
  const realtimeFiltered = useMemo(() => {
    let result = products;

    if (query) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedPrice) {
      const priceRanges = {
        1: [0, 5000],
        2: [5000, 10000],
        3: [10000, 20000],
        4: [20000, 30000],
        5: [30000, Infinity],
      };
      const [min, max] = priceRanges[selectedPrice];
      result = result.filter((p) => p.price >= min && p.price < max);
    }

    return result;
  }, [products, query, selectedCategory, selectedPrice]);

  // 반응형 아이템 개수 설정
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(8);
      } else if (width < 1440) {
        setItemsPerPage(12);
      } else {
        setItemsPerPage(15);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 필터 또는 아이템 개수 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [filtered, itemsPerPage]);

  // 페이지네이션용 현재 페이지 아이템 리스트
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage, itemsPerPage]);

  // 총 페이지 수
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="search-page">
      <h2 className="search-page__title">“{query}” 검색 결과</h2>
      <div className="search-page__layout">
        <aside className="search-filter">
          <h3>필터</h3>

          {/* 카테고리 필터 */}
          <div className="filter-group">
            <button
              className="filter-title"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
            >
              카테고리 <MdOutlineKeyboardArrowDown />
            </button>
            <h4>카테고리</h4>
            <ul className={`cat-wrap ${isCategoryOpen ? "open" : ""}`}>
              {["keyring", "sticker", "living", "card", "Memo", "Note"].map(
                (cat) => (
                  <li
                    key={cat}
                    className={selectedCategory === cat ? "active" : ""}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 가격 필터 */}
          <div className="filter-group">
            <button
              className="filter-title"
              onClick={() => setIsPriceOpen((prev) => !prev)}
            >
              가격대 <MdOutlineKeyboardArrowDown />
            </button>
            <h4>가격대</h4>
            <ul className={`pri-wrap ${isPriceOpen ? "open" : ""}`}>
              {[1, 2, 3, 4, 5].map((val, idx) => {
                const labels = [
                  "₩5,000 이하",
                  "₩5,000 ~ ₩10,000",
                  "₩10,000 ~ ₩20,000",
                  "₩20,000 ~ ₩30,000",
                  "₩30,000 이상",
                ];
                return (
                  <li key={val}>
                    <label>
                      {labels[idx]}
                      <input
                        type="radio"
                        name="price"
                        value={val}
                        checked={selectedPrice === val.toString()}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                      />
                    </label>
                  </li>
                );
              })}
            </ul>

            {/* 필터 버튼 */}
            <div className="filter-buttons">
              <button
                className="reset-button"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedPrice("");
                  setAppliedCategory("");
                  setAppliedPrice("");
                }}
              >
                필터 초기화
              </button>
              <button
                className="apply-button"
                onClick={() => {
                  setAppliedCategory(selectedCategory);
                  setAppliedPrice(selectedPrice);
                }}
              >
                {realtimeFiltered.length}개의 상품 보기
              </button>
            </div>
          </div>
        </aside>

        <section className="search-results">
          <p className="result-count">총 {filtered.length}개의 상품</p>
          <div className="product-list__grid">
            {paginated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                liked={likedItems.some((item) => item.id === product.id)}
                onToggleLike={toggleLike}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
};

export default SearchPage;
