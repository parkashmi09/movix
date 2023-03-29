import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

export default function Genres({ data }) {
  const { geners } = useSelector((state) => state.home);
  console.log("genres", geners)
  return (
    <div className="genres">
      {data?.map((id) => {
        if (!geners[id]?.name) return;
        return <div className="genre">{geners[id]?.name}</div>;
      })}r
    </div>
  );
}
