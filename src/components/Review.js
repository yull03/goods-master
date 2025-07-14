import { useEffect, useState } from "react";
import reviews from "../asset/main-3.json";
import { IoIosArrowForward } from "react-icons/io";
import { IoStar } from "react-icons/io5";

const Review = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCount(1);
      } else if (width < 1440) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => {
      window.removeEventListener("resize", updateCount);
    };
  }, []);

  return (
    <div id="review-wrap">
      <div className="review-title">
        <h2>리뷰</h2>
        <p>
          더보기
          <IoIosArrowForward />
        </p>
      </div>

      <div className="review-all-list">
        {reviews.slice(0, visibleCount).map((review) => (
          <div className="review-list" key={review.setID}>
            <div className="review-main">
              <img src={`${process.env.PUBLIC_URL}${review.setimage}`} alt={review.setTitle} />
              <div className="review-wrap">
                <span><IoStar /><IoStar /><IoStar /><IoStar /><IoStar /></span>
              <p className="reviewtxt">{review.setTitle}</p>
              <p className="reviewsub">{review.setSubtitle}</p>
              </div>
            </div>

            <div className="price">
              {review.products.map((product, idx) => (
                <a href="#" key={idx}>
                  <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.mainTitle} />
                  <div className="item">
                    <p className="small-text">by {product.brand}</p>
                    <p>{product.mainTitle}</p>
                    <p className="price-text">{product.price.toLocaleString()}원</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
