import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import pcbanner from "../asset/pc-banner.json";
import mobbanner from "../asset/mob-banner.json";

const Banner = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBanners(mobbanner);
      } else {
        setBanners(pcbanner);
      }
    };

    handleResize(); // 초기 호출
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  const settings = {
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: isPlaying,
    autoplaySpeed: 3000, // 3초마다 슬라이드
    afterChange: (index) => setCurrentSlide(index),
  };

    const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="banner-wrapper">
      <Slider  key={isPlaying ? 'playing' : 'paused'} ref={sliderRef} {...settings}>
        {banners.map((item) => (
          <img key={item.id} src={`${process.env.PUBLIC_URL}${item.image}`} alt={item.name} />
        ))}
      </Slider>

      <div className="slide-controls">
        <button onClick={() => sliderRef.current?.slickPrev()} className="arrow-button">
          <FaChevronLeft size={20} />
        </button>

        <div className="index-text">
          {currentSlide + 1} of {banners.length}
        </div>

        <button onClick={() => sliderRef.current?.slickNext()} className="arrow-button">
          <FaChevronRight size={20} />
        </button>
      </div>
      <div className="top-controls">
          <button onClick={togglePlay} className="play-pause-button">
          {isPlaying ? <FaPause/> : <FaPlay/>}
        </button>
        </div>
    </div>
  );
};

export default Banner;