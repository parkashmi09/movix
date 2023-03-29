import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import PosterFallBack from "../../assets/no-poster.png";
import dayjs from "dayjs";
import CircleRating from "../circleRating";
import Genres from "../genres";

export default function Carousel({ data, loading, endpoint, title }) {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container?.scrollLeft - (container?.offsetWidth + 20)
        : container?.scrollLeft + (container?.offsetWidth + 20);
    container?.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton">
              <div className="date skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item?.poster_path
                ? url.poster + item.poster_path
                : "";
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item?.media_type || endpoint}/${item?.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item?.vote_average} />
                    <Genres data={item?.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="data">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}
