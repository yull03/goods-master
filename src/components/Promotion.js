import { IoIosArrowForward } from "react-icons/io";
import carditem from "../asset/main-2.json";
import React from "react";

// 메인 영역
const PromoMain = React.memo(({ promotionSet }) => (
  <div className="promo-main">
    <div className="main-img-box">
      <img
        src={`${process.env.PUBLIC_URL}${promotionSet.setimage}`}
        alt={promotionSet.setTitle || promotionSet.brand || "기획전 메인 이미지"}
        className="main-img"
        loading="lazy"
      />
      <div className="main-overlay">
        <span className="main-brand-badge">
          {promotionSet.brand || "작가/브랜드"}
        </span>
        <h3 className="main-title">{promotionSet.setTitle}</h3>
        <p className="main-subtitle">{promotionSet.setSubtitle}</p>
      </div>
    </div>
  </div>
));

// 상품 카드
const ProductCard = React.memo(({ product }) => (
  <div className="product-card">
    <div className="prod-img-wrap">
      <img
        src={`${process.env.PUBLIC_URL}${product.image}`}
        alt={product.name || product.brand || "상품 이미지"}
        className="prod-img"
        loading="lazy"
      />
    </div>
    <div className="prod-info">
      <p className="prod-brand">by {product.brand}</p>
      <h3 className="prod-name">{product.name}</h3>
      <p className="prod-price">
        {product.price?.toLocaleString("ko-KR")}원
      </p>
    </div>
  </div>
));

// Promotion
const Promotion = () => (
  <div id="author-promotion-section">
    <div className="section-header">
      <h2>작가 기획전</h2>
      <p className="more-link">
        더보기 <IoIosArrowForward />
      </p>
    </div>

    {/* 데스크탑 */}
    <div className="desktop-promotion">
      <div className="promotion-list">
        {carditem.map((promotionSet) => (
          <div key={promotionSet.setID} className="promo-row">
            <PromoMain promotionSet={promotionSet} />
            <div className="promo-side-cards">
              {promotionSet.products.slice(0, 4).map((product) => (
                <ProductCard key={product.id || product.name} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 태블릿 */}
    <div className="tablet-promotion">
      <div className="tablet-promotion-list">
        {carditem.slice(0, 3).map((promotionSet) => (
          <div key={promotionSet.setID} className="tablet-promo-set">
            <PromoMain promotionSet={promotionSet} />
            <div className="tablet-side-cards">
              {promotionSet.products.slice(0, 2).map((product) => (
                <ProductCard key={product.id || product.name} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 모바일 */}
    <div className="mobile-promotion">
      <div className="mobile-promo-set">
        <PromoMain promotionSet={carditem[0]} />
        <div className="mobile-side-cards">
          <div className="mobile-row">
            {carditem[0].products.slice(0, 2).map((product) => (
              <ProductCard key={product.id || product.name} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Promotion;
