import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOEKN;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const getDataFromAPI = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log("error message::", error);
    return error;
  }
};
