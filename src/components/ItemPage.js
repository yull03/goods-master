import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";

const ItemPage = ({ onAddCart, likedItems, toggleLike }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const isLiked = product && likedItems?.some((item) => item.id === product.id);
  const [openQna, setOpenQna] = useState({
    delivery: false,
    return: false,
    group: false,
    etc: false,
  });

  const toggleQna = (key) => {
    setOpenQna((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMinus = () => {
    if (count > 1) setCount(count - 1);
  };
  const handlePlus = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/asset/sub.json`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id.toString() === id);
        setProduct(found);
      });      
      
  }, [id]);

  if (!product) {
    return <div>로딩 중...</div>;
  }

  return (
    
    <div>
      <div id="items">
        <div className="left">
          <div className="banner-tablet">
            <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} />
          </div>
          <ul className="content-list">
            <li>상품설명</li>
            <li>리뷰</li>
            <li>문의</li>
            <li>Q&A</li>
          </ul>

          <div className="detail">
            <img src={`${process.env.PUBLIC_URL}${product.detail}`} alt={product.title} />
          </div>

          {/* 자주묻는 질문 항목 */}
          <div className="qna-list">
            <h1>Q&A</h1>

            {/* 배송 */}
            <div className="Qmenu-list">
              <div
                className="Qmenu-header"
                onClick={() => toggleQna("delivery")}
              >
                배송 <button>{openQna.delivery ? "▲" : "▼"}</button>
              </div>
              {openQna.delivery && (
                <ul className="Qmenu-content">
                  <li>
                    배송완료 까지의 소요시간:
                    <br />
                    제작 완료 후 배송 시작부터 평균 2~3일(영업일 기준)
                    소요됩니다.
                  </li>
                  <li>
                    배송지 수정 방법: 결제완료, 상품준비중 단계에서는
                    마이페이지 → 주문내역 → 더보기 → 정보수정으로 변경
                    가능합니다.
                    <br />
                    배송중 단계는 수정이 불가능하며, 문의 채널을 통해 미수령
                    반품 문의 바랍니다.
                  </li>
                </ul>
              )}
            </div>

            {/* 교환/반품/주문취소 */}
            <div className="Qmenu-list">
              <div className="Qmenu-header" onClick={() => toggleQna("return")}>
                교환/반품/주문취소 <button>{openQna.return ? "▲" : "▼"}</button>
              </div>
              {openQna.return && (
                <ul className="Qmenu-content">
                  <li>
                    주문취소: 결제완료, 상품 준비중 단계에서 가능하며, 환불은
                    1~2일 내 처리됩니다.
                  </li>
                  <li>
                    단순변심 교환/반품: 수령 후 7일 이내 가능하나, 사용 또는
                    파손 시 불가합니다.
                    <br />
                    환불은 검수 후 2~3일 소요됩니다.
                  </li>
                  <li>
                    상품 불량/파손: 주문번호, 상품 정보, 사진을 첨부해
                    문의주시면 확인 후 처리됩니다.
                  </li>
                </ul>
              )}
            </div>

            {/* 단체 주문 */}
            <div className="Qmenu-list">
              <div className="Qmenu-header" onClick={() => toggleQna("group")}>
                단체 주문 <button>{openQna.group ? "▲" : "▼"}</button>
              </div>
              {openQna.group && (
                <ul className="Qmenu-content">
                  <li>
                    동일 굿즈 10개 이상 주문 시 단체 주문입니다.
                    <br />
                    단체 주문 할인은 ‘단체 주문 할인 쿠폰’을 적용해주세요.
                    <br />
                    자세한 사항은 문의 채널로 연락 바랍니다.
                  </li>
                </ul>
              )}
            </div>

            {/* 기타 문의 */}
            <div className="Qmenu-list">
              <div className="Qmenu-header" onClick={() => toggleQna("etc")}>
                기타 문의 <button>{openQna.etc ? "▲" : "▼"}</button>
              </div>
              {openQna.etc && (
                <ul className="Qmenu-content">
                  <li>
                    제품 색감 차이: 모니터(RGB)와 출력물(CMYK) 간 색상 차이
                    있을 수 있습니다.
                  </li>
                  <li>
                    계좌 등록 오류 시:
                    <br />
                    ① 일반/사업자 계좌 확인
                    <br />
                    ② 계좌번호 정확히 입력
                    <br />
                    ③ '-' 없이 숫자만 입력
                    <br />
                    ④ 새로고침/쿠키삭제 후 재시도
                    <br />
                    ⑤ 10자 초과 성명은 10자까지만
                    <br />
                    ⑥ 닉네임 아닌 본명 입력
                    <br />
                  </li>
                  <li>
                    쿠폰 사용법: 주문결제 단계에서 [쿠폰선택] 버튼으로 적용
                    가능합니다.
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="right">
          <div className="banner-mobile">
            <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} />
          </div>
          <div className="tablet-layout">
           <div className="text-top">
  <p className="color-blk">{product.brand}</p>
  {isLiked ? (
    <MdBookmark
      className="item-bookmark-icon"
      onClick={(e) => {
        e.stopPropagation();
        toggleLike(product);
      }}
    />
  ) : (
    <MdOutlineBookmarkBorder
      className="item-bookmark-icon"
      onClick={(e) => {
        e.stopPropagation();
        toggleLike(product);
      }}
    />
  )}
</div>

            <div className="item-text">
              <p className="review-text">
                <span className="color-primary">★★★★★</span> (4.9)
              </p>
              <p>{product.subtitle}</p>
              <h2>{product.name}</h2>
              <p>{product.price.toLocaleString()}원</p>
            </div>

            <div className="price-info">
              <div className="row">
                <span className="label">적립금</span>
                <span className="value highlight-red">최대 320원</span>
              </div>
              <div className="row">
                <span className="label">무이자 할부</span>
                <span className="value">카드사 할부 혜택안내</span>
              </div>
              <div className="row">
                <span className="label">배송정보</span>
                <span className="value">주문 제작 14일 이내 출고</span>
              </div>
              <div className="row">
                <span className="label">배송비</span>
                <span className="value">
                  <span className="highlight-blue">3,000원</span>
                  <br />
                  30,000원 이상 구매시 무료배송
                  <br />
                  제주/도서산간 3,500원 추가
                </span>
              </div>
            </div>

            <div className="btn-wrap">
              <div className="price-box">
                <div className="count">
                  <div className="counter">
                    <button onClick={handleMinus}>-</button>
                    <span>{count}</span>
                    <button onClick={handlePlus}>+</button>
                  </div>
                </div>
                <div>
                  총금액{" "}
                  <span>{(product.price * count).toLocaleString()}원</span>
                </div>
              </div>
              <div className="btn-cart">
                <button onClick={() => onAddCart(product, count)}>
                  장바구니 담기
                </button>
                <button>구매하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
