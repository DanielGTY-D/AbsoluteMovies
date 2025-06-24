import { Link } from "react-router";
import {dateFormatter} from "~/utils";
import 'remixicon/fonts/remixicon.css'
import type { TvSerieApiResponse } from "~/features/series/models";


interface CardProps {
  data: TvSerieApiResponse;
  type: "slide" | "horizontal";
  slug: string
}

function Card({ data, type, slug = 'movies'}: CardProps) {
  const imageBaseUrl = `https://image.tmdb.org/t/p/original${data.poster_path || ''}`;


  return (
    <>
      {
        type === "slide" && (
          <Link to={`/${slug}/${data.id ? data.id : ""}`}>
            <article className="relative w-full h-100 cursor-pointer group perspective-1000">
            <div className="relative w-full h-full transition-transform delay-100 duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden [backface-visibility:hidden]">
                <img src={imageBaseUrl} alt={data.original_name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden bg-rose-900 text-white flex flex-col justify-center items-center p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <h3 className="text-lg font-bold mb-2 text-center">{data.original_name}</h3>
                <p className="text-sm text-center line-clamp-4">{data.overview || 'Sin descripción.'}</p>
              </div>
            </div>
          </article>
          </Link>
        )
      }
      {
        type === "horizontal" && (
          <article className="flex gap-1.5 bg-rose-900">
            <Link to={`${slug}/${data.id}`} className="overflow-hidden max-w-80">
              <img className="w-80 h-full" src={imageBaseUrl} alt={data.original_name} loading="lazy" />
            </Link>

            <div className="p-2.5 flex flex-col gap-2.5">
              <h3 className="text-base font-bold flex flex-wrap text-white">{data.original_name} <span>{dateFormatter(data.first_air_date ? data.first_air_date : "")}</span></h3>
              <p className="text-sm text-gray-300">{data.overview.slice(0, 60) + "..."}</p>

              <div>
                <p className="flex items-center text-gray-300"><span className="font-semibold">Pop:</span> {data.popularity}<i className="ri-percent-line"></i></p>
                <p className="flex items-center text-gray-300"><span className="font-semibold">Votos:</span> {data.vote_count}<i className="ri-user-line"></i></p>
              </div>
            </div>
          </article>
        )
      }
    </>
  );
};

export default Card;
