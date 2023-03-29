import React from "react";
import Carousel from "../../../../components/carousel";
import useFetchAPI from "../../../../hooks/useFetchAPI";
export default function Recommendation({ mediaType, id }) {
  const { data, loading, error } = useFetchAPI(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
}
