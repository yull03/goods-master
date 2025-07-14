import "./App.scss";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import CategoryApp from "./components/Category";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import MypageTD from "./components/MypageTD";
import MypageMobile from "./components/MypageMobile";
import useWindowSize from "./hooks/useWindowSize";
import WishList from "./components/WishList";
import SearchPage from "./components/SearchPage";
import ItemPage from "./components/ItemPage";
import Msearch from "./components/Msearch";

const App = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedItems, setLikedItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const width = useWindowSize();

  // 장바구니에 아이템 추가
  const handleAddCart = (product, count) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, count: item.count + count } : item
        );
      }
      return [...prev, { ...product, count }];
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  /****************************** */

  const toggleLike = (item) => {
    setLikedItems((prev) => {
      const isLiked = prev.find((i) => i.id === item.id);
      if (isLiked) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
              isLoggedIn={isLoggedIn}
            />
          }
        >
          <Route path="/" element={<Home onAddCart={handleAddCart} />} />
          <Route
            path="/category/:cat"
            element={
              <CategoryApp
                selectedCategory={selectedCategory}
                likedItems={likedItems}
                toggleLike={toggleLike}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/mypage"
            element={
              width <= 768 ? (
                <MypageMobile setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <MypageTD setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                setCart={setCart}
                onCategorySelect={handleCategorySelect}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishList likedItems={likedItems} toggleLike={toggleLike} />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ItemPage
                onAddCart={handleAddCart}
                likedItems={likedItems}
                toggleLike={toggleLike}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                likedItems={likedItems}
                toggleLike={toggleLike}
                onCategorySelect={handleCategorySelect}
              />
            }
          />
          <Route path="/msearch" element={<Msearch />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
