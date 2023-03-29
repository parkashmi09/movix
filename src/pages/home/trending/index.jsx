import React, { useState } from "react";
import Carousel from "../../../components/carousel";
import ContentWrapper from "../../../components/contentWrapper";
import SwitchTabs from "../../../components/switchTabs";
import useFetchAPI from "../../../hooks/useFetchAPI";
import "../home.scss";

export default function Trending() {
  const [endpoint, setEndPoint] = useState("day");
  const { data, loading } = useFetchAPI(`/trending/all/${endpoint}`);
  const onTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
}
