import { Link } from "react-router";
import type { MovieApiResponse } from "~/features/movies/models/movies.model";
import dateFormatter from "~/utils/dateFormatter";
import 'remixicon/fonts/remixicon.css'

interface CardProps {
  data: MovieApiResponse;
  type: "slide" | "horizontal";
}

function Card({ data, type }: CardProps) {
  const imageBaseUrl = `https://image.tmdb.org/t/p/original${data.poster_path || ''}`;


  return (
    <>
      {
        type === "slide" && (
          <article className="relative w-full h-100 cursor-pointer group perspective-1000">
            <div className="relative w-full h-full transition-transform delay-100 duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden [backface-visibility:hidden]">
                <img src={imageBaseUrl} alt={data.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden bg-gray-900 text-white flex flex-col justify-center items-center p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <h3 className="text-lg font-bold mb-2 text-center">{data.title}</h3>
                <p className="text-sm text-center line-clamp-4">{data.overview || 'Sin descripción.'}</p>
              </div>
            </div>
          </article>
        )
      }
      {
        type === "horizontal" && (
          <article className="flex gap-1.5">
            <Link to={`movie/`}>
              <img className="w-80 h-full" src={imageBaseUrl} alt={data.title} loading="lazy" />
            </Link>

            <div>
              <h3 className="text-base font-bold flex flex-wrap">{data.title} <span>{dateFormatter(data.release_date)}</span></h3>
              <p className="text-sm">{data.overview.slice(0, 60) + "..."}</p>

              <div>
                <p className="flex items-center"><span className="font-semibold">Pop:</span> {data.popularity}<i className="ri-percent-line"></i></p>
                <p className="flex items-center"><span className="font-semibold">Votos:</span> {data.vote_count}<i className="ri-user-line"></i></p>
              </div>
            </div>
          </article>
        )
      }
    </>
  );
};

export default Card;
