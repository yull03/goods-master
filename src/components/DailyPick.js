import { IoIosArrowForward } from "react-icons/io";
import DRCard from "./DRCard";
import carditem from "../asset/main-1.json";
import { useEffect, useState } from "react";

const DailyPick = () => {
  const [visiableCount, setVisiableCount] = useState(3);
    const [visiableItems,setVisiableItems] = useState([]);
    useEffect(()=>{
        const updateCount = ()=>{
            const width = window.innerWidth; //vw
            if(width < 768){
                //모바일
                setVisiableCount(1);
            } else if(width < 1440){
                //태블릿
                setVisiableCount(2);
            } else {
                //데스크탑
                setVisiableCount(3);
            }
        }
        updateCount();
        window.addEventListener('resize',updateCount);
        return ()=>{
            window.removeEventListener('resize',updateCount);
        }
    },[]);
    useEffect(()=>{
        setVisiableItems(carditem.slice(0,visiableCount))
    },[visiableCount])
  return (
    <div id="daily-record">
      <div className="title">
        <h2>Daily Pick</h2>
        <p>
          더보기
          <IoIosArrowForward />
        </p>
      </div>
      <div className="daily-wrap">
        {visiableItems.map((item) => {
          return (
            <DRCard
              key={item.setID}
              item = {item}
              id={item.setID}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DailyPick;
