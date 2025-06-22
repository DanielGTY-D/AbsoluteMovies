import MoviesSection from "./components/moviesSection"

const Movies = () => {
  return (
    <>

      <h2 className="text-rose-800 text-5xl font-semibold text-center my-10">Movies</h2>
      <MoviesSection category="popular" classNext="nextPopular" classPrev="prevPopular" type="swiper" slug="movie" />
      <MoviesSection category="now_playing" classNext="nextNow" classPrev="prevNow" type="swiper" slug="movie" />
      <MoviesSection category="top_rated" classNext="nextTop" classPrev="prevTop" slug="movie" />
    </>
  )
}

export default Movies