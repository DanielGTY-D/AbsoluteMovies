import type { VideosApiResponse } from "../models/videos.model";

interface VideosSectionProps {
  data: VideosApiResponse
}

const VideosSection = ({ data }: VideosSectionProps) => {
  return (
    <>
      {data && data.length > 0 && (
        <section className="container mx-auto lg:max-w-6xl mt-12 px-5 md:px-0">
          <h2 className="text-2xl font-bold text-rose-800 mb-6">Videos y Trailers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((video: { key: string; name: string; type: string }) => (
              <div key={video.key} className="group bg-white/80 hover:bg-rose-50 rounded-xl shadow-lg flex flex-col items-center p-3 hover:scale-[1.04] transition-all duration-200 border border-rose-100 cursor-pointer">
                <div className="relative w-full aspect-video flex items-center justify-center mb-2 overflow-hidden rounded-lg">
                  <iframe
                    className="w-full h-full rounded-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-200"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                  <span className="absolute top-2 right-2 bg-rose-600/90 text-white text-[10px] px-2 py-0.5 rounded-full shadow font-semibold uppercase">{video.type}</span>
                </div>
                <h3 className="text-xs font-semibold text-rose-700 text-center line-clamp-2 mb-1 w-full truncate">{video.name}</h3>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default VideosSection;