import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

const keywords = [
    "빵빵이 바디필로우",
    "지드래곤 위버멘쉬 오피셜 미니 라이트 키링 민트",
    "짱구 스티커",
    "수채화 풍경 엽서 세트 2",
    "거북이 노랑 노트",
];

const Msearch = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/search?query=${encodeURIComponent(search.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="search-modal">

            <h1>
                어떤 상품을
                <br />
                <strong>찾고 계신가요?</strong>
            </h1>
            <div className="input-row">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="검색어를 입력하세요."
                />
                <IoSearchOutline
                    size={24}
                    className="icon"
                    onClick={handleSearch}
                />
            </div>
            <div className="suggest">
                <p className="label">추천 검색어</p>
                <div className="tags">
                    {keywords.map((k, i) => (
                        <span
                            className="tag"
                            key={i}
                            onClick={() => {
                                setSearch(k);
                                navigate(
                                    `/search?query=${encodeURIComponent(k)}`
                                );
                            }}
                        >
                            {k}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Msearch;
