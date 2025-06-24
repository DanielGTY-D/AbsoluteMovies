import { Section } from "~/components/UI"

const Movies = () => {
  return (
    <>

      <h2 className="text-rose-800 text-5xl font-semibold text-center my-10">Movies</h2>
      <Section ApiCategory="now_playing" MediaType="movie" Swiper={{Active: true, ClassNext: "now-playing-next", ClassPrev: "now-playing-prev"}} cardType="slide"/>
      <Section ApiCategory="popular" MediaType="movie" Swiper={{Active: true, ClassNext: "popular-next", ClassPrev: "popular-prev"}} cardType="slide"/>
      <Section ApiCategory="top_rated" MediaType="movie" Swiper={{Active: false, ClassNext: "top-rated-next", ClassPrev: "top-rated-prev"}} cardType="horizontal"/>
    </>
  )
}

export default Movies