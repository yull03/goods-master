import useWindowSize from "../hooks/useWindowSize"; // 만든 훅 불러오기
import MypageMobile from "./MypageMobile";
import MypageTD from "./MypageTD";

const Mypage = () => {
  const width = useWindowSize(); // 현재 화면 너비 감지

  return width <= 768 ? <MypageMobile /> : <MypageTD />;
};

export default Mypage;