import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, liked, onToggleLike }) => {
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.onerror = null;
  };

  const handleClick = () => {
    if (product.detail) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="product-card group">
      <div className="product-card__image-wrapper" onClick={handleClick}>
        <img
          src={`${process.env.PUBLIC_URL}${product.image}`}
          alt={product.name}
          className="product-card__image"
          onError={handleImageError}
        />
        {liked ? (
          <MdBookmark
            className="product-card__bookmark-icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(product);
            }}
          />
        ) : (
          <MdOutlineBookmarkBorder
            className="product-card__bookmark-icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(product);
            }}
          />
        )}
      </div>
      <div className="product-card__info">
        <p className="product-card__brand">by {product.brand}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">
          {product.price.toLocaleString("ko-KR")}원
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
