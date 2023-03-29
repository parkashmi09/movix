import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getDataFromAPI } from "./utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "../src/store/slice/hompage";
import Header from "./components/header/header";
import { Footer } from "./components/footer/footer";
import ErrorPage from "./pages/errorPage";
import { Home } from "./pages/home";
import Details from "./pages/details";
import SearchResult from "./pages/searchResult";
import Explore from "./pages/explore";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state).home.url;
  useEffect(() => {
    getDataFromAPI("/configuration").then((res) => {
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
    genresCall();
  }, []);

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(getDataFromAPI(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data?.map(({ genres }) => {
      return genres?.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
