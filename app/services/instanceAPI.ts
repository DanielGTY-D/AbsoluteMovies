import axios from "axios";

const moviesAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});

const seriesAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv",
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});

const InstanceAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});

const api = axios.create({
  baseURL: "http://localhost:4001/api",
});

export { moviesAPI, seriesAPI, InstanceAPI, api };
