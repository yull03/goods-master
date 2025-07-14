import { GoBookmark } from "react-icons/go";

const DRCard = ({item, id}) => {
  return (
    <div key={id} className="drcard">
      <div className="main-img">
        <img src={`${process.env.PUBLIC_URL}${item.image}`} />
      </div>
      <div className="main-title">
        <h3>{item.setTitle}</h3>
        <p>{item.setSubtitle}</p>
      </div>
      <ul className="bottom">
        {item.products.map((product) => (
          <li key={product.productID}>
            <div className="sub-img">
              <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} />
            </div>
            <div className="sub-title">
              <p>{product.brand}</p>
              <p>{product.name}</p>
              <p>{product.price.toLocaleString()}원</p>
            </div>
            <div className="icon-box">
              <GoBookmark className="bookmark-icon" />
              <span className="count">{product.count.toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DRCard;
