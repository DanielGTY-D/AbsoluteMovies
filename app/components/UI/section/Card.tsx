import type { MovieApiResponse } from "~/features/movies/models/movies.model";

interface CardProps {
  data: MovieApiResponse;
}

function Card({ data }: CardProps) {
  const imageBaseUrl = `https://image.tmdb.org/t/p/w500${data.poster_path || ''}`;


  return (
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
  );
};

export default Card;
