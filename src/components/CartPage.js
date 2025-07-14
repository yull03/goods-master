import { useNavigate } from "react-router-dom";
import { BsBasket } from "react-icons/bs";

const CartPage = ({ cart, setCart, onCategorySelect }) => {
  const navigate = useNavigate();

  const handleGoToBest = () => {
    if (onCategorySelect) {
      onCategorySelect("best");
    }
    navigate("/category/best");
  };

  const allChecked = cart.length > 0 && cart.every((item) => item.checked);

  const selectedCount = cart.filter((item) => item.checked).length;

  const toggleAll = () => {
    const updated = cart.map((item) => ({ ...item, checked: !allChecked }));
    setCart(updated);
  };

  const toggleItem = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const changeQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count + delta) }
          : item
      )
    );
  };

  const deleteSelected = () => {
    setCart(cart.filter((item) => !item.checked));
  };

  const total = cart
    .filter((item) => item.checked)
    .reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="cart-wrap">
      <div className="cart-left">
        <div className="title">
          <h2>Cart</h2>
          <div className="cart-header">
            <label>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
              />
              전체선택
            </label>
            <button onClick={deleteSelected}>선택삭제</button>
          </div>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <BsBasket className="basket-icon" />
            <h3>장바구니가 비어있어요</h3>
            <p>새로운 상품으로 채워주세요</p>
            <button onClick={handleGoToBest}>인기 상품 보러가기</button>
          </div>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <input
                  type="checkbox"
                  checked={item.checked || false}
                  onChange={() => toggleItem(item.id)}
                />
                <div className="mobile-wrap">
                  <div className="item-thumbnail">
                    <img src={`${process.env.PUBLIC_URL}${item.image}`} alt={item.title} />
                  </div>
                  <div className="item-info">
                    <div className="text-wrap">
                      <p className="brand">Shop</p>
                    <p className="name">{item.name}</p>
                    <p className="option">{item.brand}</p>
                    </div>
                    <div className="quantity">
                      <button onClick={() => changeQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.count}</span>
                      <button onClick={() => changeQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="price">
                  {(item.price * item.count).toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="cart-summary">
        <h4>결제예정 금액</h4>
        <ul>
          <li>
            <span>상품금액</span>
            <span>{total.toLocaleString()}원</span>
          </li>
          <li>
            <div className="delivery">
              <p>3만원 이상 무료배송</p>
              <span className="delivery-fee">배송비</span>
            </div>
            <span>
              {selectedCount === 0 ? "0원" : total >= 30000 ? "0원" : "3,000원"}
            </span>
          </li>
        </ul>
        <div className="total">
          결제예정금액{" "}
          <h5>
            {(
              total + (selectedCount === 0 ? 0 : total >= 30000 ? 0 : 3000)
            ).toLocaleString()}
            원
          </h5>
        </div>
        <button className="order-btn">주문하기</button>
      </div>
    </div>
  );
};

export default CartPage;
