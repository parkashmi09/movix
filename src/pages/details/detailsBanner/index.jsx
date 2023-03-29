import Genres from "../../../components/genres";
import "./style.scss";
import useFetchAPI from "../../../hooks/useFetchAPI";
import ContentWrapper from "../../../components/contentWrapper";
import PosterFallBack from "../../../assets/no-poster.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import React, { useState } from "react";
import dayjs from "dayjs";
import CircleRating from "../../../components/circleRating";
import PlayButton from "../playbtn";
import VideoPopup from "../../../components/videoPopUp";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetchAPI(`/${mediaType}/${id}`);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const _genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screeplay" || f.job === "Story" || f.job === "Writer"
  );

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        src={url.backdrop + data.poster_path}
                        className="posterImg"
                      />
                    ) : (
                      <Img src={PosterFallBack} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${data.title || data.name}(${dayjs(
                      data.release_date
                    ).format("YYYY")})`}</div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average?.toFixed(1)} />
                      <div
                        onClick={() => {
                          setShow(true);
                          setVideoId(video?.key);
                        }}
                        className="playbtn"
                      >
                        <PlayButton />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status </span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date </span>
                          <span className="text">
                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:{""}</span>
                        <span className="text">
                          {director?.map((data, index) => {
                            return (
                              <span key={index}>
                                {data?.name}
                                {director?.length - 1 !== index && ","}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:{""}</span>
                        <span className="text">
                          {writer?.map((data, index) => {
                            return (
                              <span key={index}>
                                {data?.name}
                                {writer?.length - 1 !== index && ","}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:{""}</span>
                        <span className="text">
                          {data?.created_by?.map((data, index) => {
                            return (
                              <span key={index}>
                                {data?.name}
                                {writer?.length - 1 !== index && ","}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>
              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};
export default DetailsBanner;
