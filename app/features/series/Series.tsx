import { Section } from '~/components/UI'

const Series = () => {
  return (
    <>
      <h1 className="text-rose-800 text-5xl font-semibold text-center my-10">Series</h1>

      <Section ApiCategory='top_rated' MediaType='tv' Swiper={{ Active: true, ClassNext: "top-rated-next", ClassPrev: "top-rated-prev" }} cardType='slide'/>
      <Section ApiCategory='on_the_air' MediaType='tv' Swiper={{ Active: true, ClassNext: "on-the-air-next", ClassPrev: "on-the-air-prev" }} cardType='slide'/>
      <Section ApiCategory='popular' MediaType='tv' Swiper={{ Active: true, ClassNext: "popular-next", ClassPrev: "popular-prev" }} cardType='slide'/>
    </>
  )
}

export default Series;