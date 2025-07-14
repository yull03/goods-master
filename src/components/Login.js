import { FaApple } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    if (id.trim() && pw.trim()) {
      setIsLoggedIn(true); // ✅ 로그인 상태 true
      navigate("/mypage"); // 마이페이지로 이동
    } else {
      alert("아이디와 비밀번호를 입력하세요.");
    }
  };

   const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-box">
        <h1>LOGIN</h1>
        <h2>로그인해주세요</h2>
          <input
          type="text"
          placeholder="아이디"
          value={id}
          onKeyDown={handleKeyDown}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onKeyDown={handleKeyDown}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>로그인</button>
        <div className="find-wrap">
          <p>아이디 찾기</p>
          <p>비밀번호 찾기</p>
        </div>
        <button className="join-btn">회원가입</button>
        <div className="icon-wrap">
          <div className="icon apple">
            <FaApple />
          </div>
          <div className="icon naver">
            <SiNaver />
          </div>
          <div className="icon kakao">
            <RiKakaoTalkFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
