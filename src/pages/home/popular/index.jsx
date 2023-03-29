import React, { useState } from "react";
import Carousel from "../../../components/carousel";
import ContentWrapper from "../../../components/contentWrapper";
import SwitchTabs from "../../../components/switchTabs";
import useFetchAPI from "../../../hooks/useFetchAPI";

export default function Popular() {
  const [endpoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetchAPI(`/${endpoint}/popular`);
  const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel endpoint={endpoint} data={data?.results} loading={loading} />
    </div>
  );
}
