import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper";
import MovieCard from "../../components/movieCard";
import Spinner from "../../components/spinner";
import { getDataFromAPI } from "../../utils/helper";
import "./style.scss";

export default function SearchResult() {
  const [data, setData] = useState(null);
  console.log("data comes ", data);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialdata = () => {
    setLoading(true);
    getDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };
  const fetchNextPageData = () => {
    getDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialdata();
  }, [query]);
  return (
    <div className="searchResultsPage ">
      {loading && <Spinner intitial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search${
                  data?.total_results?.length > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((data, index) => {
                  if (data?.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={data} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry , results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
}
