import axios from 'axios';

const moviesAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  }
})

const seriesAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv",
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  }
})


export {
  moviesAPI,
  seriesAPI
}