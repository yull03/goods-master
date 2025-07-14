import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer>
            <div className="top-text">
                <p><a href="#">회사 소개</a></p>
                <p className="bold-text"><a href="#">개인정보 처리 방침</a></p>
                <p><a href="#">이용 약관</a></p>
                <p><a href="#">고객 센터</a></p>
            </div>
            <div className="icon">
                <p><FaXTwitter /></p>
                <p><GrInstagram /></p>
                <p><FaYoutube /></p>
            </div>
            <ul>
            <li className="middle-text">
                <p>고객센터</p>
                <h2>1588-0000</h2>
                <p>평일: 09:00 ~ 18:00</p>
                <p>E-mail : customer@artbox.co.kr</p>
            </li>
            <li className="bottom-text">
                <p>대표자: ㅇㅇㅇ 사업자 등록번호 | 123-456-7890 <br/>
                주소 | 서울특별시 강남구 테헤란로 123, 7층<br/>
                통신판매업신고 | 제2025-서울강남-1234호</p>
            </li>
            </ul>
            <div className="foot-text">
                <img src={`${process.env.PUBLIC_URL}/images/logo1-1.png`}/>
                <p>ⓒ 2025 [Ririm].<br/>
                All rights reserved.</p>
            </div>
            
        </footer>
    );
};

export default Footer;