import React from "react";
import HeroBanner from "./heroBanner";
import Popular from "./popular";
import TopRated from "./topRated";
import Trending from "./trending";

export const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};
