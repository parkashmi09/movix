import React from "react";
import { useParams } from "react-router-dom";
import useFetchAPI from "../../hooks/useFetchAPI";
import Recommendation from "./carousels/recommended";
import Similar from "./carousels/similar";
import Cast from "./cast";
import "./details.scss";
import DetailsBanner from "./detailsBanner";
import VideosSection from "./videosSection";

export default function Details() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetchAPI(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetchAPI(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}
