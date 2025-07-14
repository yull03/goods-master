
import { useNavigate } from "react-router-dom";

const MypageTD = ({setIsLoggedIn }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn (false);
        navigate("/");
        window.scrollTo(0, 0);
    };
    return (
        <div className="mypagetd-wrap">
            <div className="container">
                <header>
                    <div className="greet">
                        <h4>반가워요 ___님!</h4>
                    </div>
                </header>

                <div className="member-container">
                    <div className="section">
                        <p className="label">회원 등급</p>
                        <div className="grade-wrap">
                            <p className="value">FAMILY</p>
                            <button className="benefit-btn">
                                등급별 혜택 보기
                            </button>
                        </div>
                    </div>
                    <div className="section">
                        <p className="label">적립금</p>
                        <p className="value">0원</p>
                    </div>
                    <div className="section">
                        <p className="label">사용 가능 쿠폰</p>
                        <p className="value">0</p>
                    </div>
                </div>

                <h2>나의 주문처리 현황</h2>

                <div className="order-container">
                    <div className="order-item">
                        <p className="title">0</p>
                        <p className="sub">입금전</p>
                    </div>
                    <div className="order-item">
                        <p className="title">0</p>
                        <p className="sub">배송준비중</p>
                    </div>
                    <div className="order-item">
                        <p className="title">0</p>
                        <p className="sub">배송중</p>
                    </div>
                    <div className="order-item">
                        <p className="title">0</p>
                        <p className="sub">배송완료</p>
                    </div>
                </div>

                <div className="grid-container">
                    <div className="box">
                        <p className="title">ORDER</p>
                        <p className="sub">주문내역 조회</p>
                    </div>
                    <div className="box" onClick={() => navigate("/cart")} >
                        <p className="title">CART</p>
                        <p className="sub">장바구니</p>
                    </div>
                    <div className="box" onClick={() => navigate("/wishlist")}>
                        <p className="title">WISHLIST</p>
                        <p className="sub">관심 상품</p>
                    </div>
                    <div className="box">
                        <p className="title">MILEAGE</p>
                        <p className="sub">적립금</p>
                    </div>
                    <div className="box">
                        <p className="title">COUPON</p>
                        <p className="sub">쿠폰</p>
                    </div>
                    <div className="box">
                        <p className="title">RECENTLY VIEWED</p>
                        <p className="sub">최근 본 상품</p>
                    </div>
                    <div className="box">
                        <p className="title">BOARD</p>
                        <p className="sub">게시물 관리</p>
                    </div>
                    <div className="box">
                        <p className="title">ADDRESS</p>
                        <p className="sub">배송 주소록 관리</p>
                    </div>
                    <div className="box">
                        <p className="title">PROFILE</p>
                        <p className="sub">회원 정보</p>
                    </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default MypageTD;
