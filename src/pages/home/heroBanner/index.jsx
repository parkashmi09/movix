import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../../components/contentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import useFetchAPI from "../../../hooks/useFetchAPI";
import "./heroBanner.scss";

export default function HeroBanner() {
  const [query, setQuery] = useState("");
  const [background, setBackground] = useState("");
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const { data, loading } = useFetchAPI("/movie/upcoming");
  const handleSearch = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  useEffect(() => {
    var bg =
      url?.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <ContentWrapper>
        <div className="opacity-layer"></div>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, TV shows and people to discover. Explore Now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie ot TV show..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleSearch}
            />
            <button>Search </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
