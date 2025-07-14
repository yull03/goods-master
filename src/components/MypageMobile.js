import { BiSolidCoupon } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { BsCoin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const MypageMobile = ({setIsLoggedIn } ) => {
     const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
    window.scrollTo(0, 0);
  };
    return (
        <div className="mypagemobile-wrap">
            <div className="member-wrap">
                <h6>___님은 [FAMILY] 회원이십니다.</h6>
                <button className="benefit-btn">등급별 혜택 보기</button>
            </div>
            <div className="allitem-wrap">
                <div className="item-wrap">
                    <BiSolidCoupon />
                    <p>쿠폰</p>
                    <p>0</p>
                </div>
                <div className="item-wrap"onClick={() => navigate("/cart")} >

                    <IoCartOutline />
                    <p>장바구니</p>
                    <p>0</p>
                </div>
                <div className="item-wrap">
                    <BsCoin />
                    <p>포인트</p>
                    <p>0원</p>
                </div>
            </div>
            <div className="container">
                <div className="box">
                    <h4 className="title">ORDER<br/>TAKING</h4>
                    <p className="sub-title">주문내역조회</p>
                </div>
                <div className="box">
                    <h4 className="title">PROFILE</h4>
                    <p className="sub-title">회원정보</p>
                </div>
                <div className="box">
                    <h4 className="title">WISHLIST</h4>
                    <p className="sub-title">관심상품</p>
                </div>
                <div className="box">
                    <h4 className="title">BOARD</h4>
                    <p className="sub-title">게시물관리</p>
                </div>
                <div className="box">
                    <h4 className="title">MILEAGE</h4>
                    <p className="sub-title">적립금</p>
                </div>
                <div className="box">
                    <h4 className="title">COUPON</h4>
                    <p className="sub-title">쿠폰</p>
                </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MypageMobile;