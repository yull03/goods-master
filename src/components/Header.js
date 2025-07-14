import { useState } from "react";
import { GoBookmark } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { IoCartOutline, IoMenu, IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = ({ onCategorySelect, isLoggedIn }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categoryList = [
    "all",
    "best",
    "keyring",
    "sticker",
    "living",
    "card",
    "Memo",
    "Note",
  ];

  const handleCategoryClick = (cat) => {
    if (onCategorySelect) {
      onCategorySelect(cat);
    }
    navigate(`/category/${cat}`);
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header id="header">
      <div className="header-top">
        {/* 모바일 메뉴 버튼 */}
        <button
          className="menu-toggle-btn"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="메뉴 열기/닫기"
        >
          <IoMenu />
        </button>

        {/* 모바일 슬라이드 메뉴 */}
        <nav className={`menubar mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <ul className="icon-wrap">
          <li>
            <GoBookmark onClick={() => {navigate("/wishlist"); setIsMenuOpen(false);}} />
          </li>
          <li>
            <FiUser onClick={()=>{handleUserClick(); setIsMenuOpen(false); }} />
          </li>
          <li>
            <IoCartOutline onClick={() => {navigate("/cart"); setIsMenuOpen(false);}} />
          </li>
        </ul>
          <ul>
            <li  onClick={() => {navigate("/"); setIsMenuOpen(false);}}>HOME</li>
            {categoryList.map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  handleCategoryClick(cat);
                  setIsMenuOpen(false);
                }}
              >
                {cat.toUpperCase()}
              </li>
            ))}
          </ul>
        </nav>
         {isMenuOpen && (
          <div
            className="overlay"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* 로고 */}
        <img
          onClick={() => navigate("/")}
          className="logo"
          src={`${process.env.PUBLIC_URL}/images/logo1.png`}
          alt="리림 로고"
        />

        {/* 검색창 */}
        <div className="search">
          <span className="icon">
            <IoSearchOutline />
          </span>
          <input
            type="text"
            placeholder="어떤 상품을 찾고 계신가요?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
                            className="search-btn"
                            onClick={() => {
                                if (window.innerWidth >= 412 && window.innerWidth <= 768) {
                                    navigate("/msearch");
                                } else {
                                    handleSearch();
                                }
                            }}
                        >
                            <IoSearchOutline />
                        </button>

        {/* 우측 아이콘들 */}
        <ul className="icon-wrap">
          <li>
            <GoBookmark onClick={() => navigate("/wishlist")} />
          </li>
          <li>
            {!isLoggedIn && <span>로그인</span>}
            <FiUser onClick={handleUserClick} />
          </li>
          <li>
            <IoCartOutline onClick={() => navigate("/cart")} />
          </li>
        </ul>
      </div>

      {/* 데스크탑용 메뉴바 (상단 가로 메뉴) */}
      <nav className="menubar desktop-menu">
        <ul>
          {categoryList.map((cat) => (
            <li key={cat} onClick={() => handleCategoryClick(cat)}>
              {cat.toUpperCase()}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
