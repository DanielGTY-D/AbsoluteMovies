import { Link } from "react-router";
import type { MoviesApiResponse } from "../models/movies.model";

interface RelatedSectionProps {
  data: MoviesApiResponse
}

const RelatedSection = ({ data }: RelatedSectionProps) => {
  return (
    <>
      {data && data.length > 0 && (
        <section className="container mx-auto lg:max-w-6xl mt-16 px-5 md:px-0">
          <h2 className="text-2xl font-bold text-rose-800 mb-6">Películas Relacionadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {data.map((rel) => (
              <div key={rel.id} className="group bg-gradient-to-br from-white/90 to-rose-100/80 hover:from-rose-50 hover:to-white rounded-2xl shadow-xl flex flex-col items-center p-4 hover:scale-[1.05] transition-all duration-200 border border-rose-200 cursor-pointer relative overflow-hidden">
                <Link to={`/movie/${rel.id}`} className="relative w-full h-48 flex items-center justify-center mb-3 overflow-hidden rounded-xl shadow group-hover:ring-2 group-hover:ring-rose-400 transition-all duration-200">
                  {rel.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${rel.poster_path}`}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-rose-200 rounded-xl text-rose-600 text-xs">Sin imagen</div>
                  )}
                  <span className="absolute top-2 right-2 bg-rose-600/90 text-white text-[11px] px-2 py-0.5 rounded-full shadow font-semibold tracking-wide">{rel.release_date?.slice(0, 4) ?? ''}</span>
                  <span className="absolute bottom-2 left-2 bg-white/80 text-rose-700 text-[10px] px-2 py-0.5 rounded shadow font-bold uppercase tracking-wider">{rel.original_language?.toUpperCase()}</span>
                </Link>
                <span className="text-sm font-bold text-rose-700 text-center line-clamp-2 mb-1 w-full truncate group-hover:text-rose-900 transition-colors">{rel.title}</span>
                <span className="text-xs text-gray-500 italic text-center mb-1">Rating: <span className="font-semibold text-rose-600">{rel.vote_average ?? 'N/A'}</span></span>
                <span className="text-[10px] text-gray-400 text-center">{rel.overview?.slice(0, 60)}{rel.overview && rel.overview.length > 60 ? '...' : ''}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default RelatedSection;