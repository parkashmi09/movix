import React from "react";
import Carousel from "../../../../components/carousel";
import useFetchAPI from "../../../../hooks/useFetchAPI";


export default function Similar({ mediaType, id }) {
  const { data, loading, error } = useFetchAPI(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
}
