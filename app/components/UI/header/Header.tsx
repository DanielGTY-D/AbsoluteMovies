import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router';
import useAppStore from '~/store/appStore';
import { useState } from 'react';


function Header() {
  const [currentMovie, setCurrentMovie] = useState(0);
  const [showDropdownMovie, setShowDropdownMovie] = useState(false);
  const [showDropdownSerie, setShowDropdownSerie] = useState(false);
  const upcomingMovies = useAppStore(state => state.upcomingMovies);
  const imageBaseUrl = `https://image.tmdb.org/t/p/original${upcomingMovies[currentMovie]?.poster_path || ''}`;

  if(showDropdownMovie && showDropdownSerie) {
    setShowDropdownSerie(false);
  } else if(showDropdownSerie && showDropdownMovie) {
    setShowDropdownMovie(false);
  }
  return (
    <>
      {
        upcomingMovies.length && (
          upcomingMovies.map(movie => (
            <div key={movie.id} style={{ backgroundImage: `url(\"${imageBaseUrl}\")` }} className={`bg-no-repeat bg-cover bg-center w-full h-full absolute transition duration-300 after:content-[""] after:bg-black after:w-full after:h-full after:block after:opacity-75`}></div>
          ))
        )
      }
      <header className='container mx-auto xl:max-w-6xl z-20 sticky top-0 left-0 bg-[rgba(0 0 0 0 / .2.5)] backdrop-blur-sm px-4 border-b-4 border-rose-600 rounded-b-2xl'>
        <div className='flex flex-col sm:flex-row items-center justify-between py-5'>
          <h1 className='text-balance text-rose-600 font-bold text-2xl md:text-4xl'>Absolute Movies</h1>

          <nav className='flex items-start gap-8'>
            <div className='relative group'>
              <button className='cursor-pointer text-rose-600 flex items-center gap-2 text-lg font-semibold' onClick={() => setShowDropdownMovie(!showDropdownMovie)}>
                Movies
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <ul className={`absolute bg-rose-800 text-rose-100 rounded-lg overflow-hidden cursor-pointer transform group-hover:scale-100 ${showDropdownMovie ? "scale-100" : "scale-0"} transition-transform duration-500 ease-in-out md:delay-300`}>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/popular"}>Populares</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/listings"}>En Cartelera</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/best-raiting"}>Mejor Valoradas</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/premieres"}>Estrenos</Link></li>
              </ul>
            </div>

            <div className='relative group'>
              <button className='text-rose-600 cursor-pointer flex items-center gap-2 text-lg font-semibold' onClick={() => setShowDropdownSerie(!showDropdownSerie)}>
                Series
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <ul className={`absolute bg-rose-800 text-rose-100 rounded-lg overflow-hidden cursor-pointer transform group-hover:scale-100 ${showDropdownSerie ? "scale-100" : "scale-0"} transition-transform duration-500 ease-in-out md:delay-300`}>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/series/popular"}>Populares</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/series/on-airing"}>En Emision</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/series/best-raiting"}>Mejor Valoradas</Link></li>
              </ul>
            </div>

            <div className='flex items-center gap-2'>
              <Link className='text-rose-600 text-lg font-semibold' to={"/acount/log-in"}>log In</Link>
              <Link className='text-rose-600 text-lg font-semibold' to={"/acount/sign-up"}>Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      <div className='mt-50 container mx-auto flex flex-wrap justify-between items-center md:max-w-6xl'>
        {/* <div className='container mx-auto xl:max-w-6xl relative z-10 mb-10'>
          <h2 className='text-rose-600 text-center text-3xl md:text-5xl font-bold mb-4'>Upcoming Movies</h2>
          <p className='text-rose-100 text-center text-lg md:text-xl'>Discover the latest movies coming soon to theaters.</p>
        </div> */}

        <ul className='flex flex-col h-[457px] overflow-x-auto w-fit z-40 relative gap-6 no-scrollbar snap-y scroll-smooth after:content-[""] after:bg-rose-800 after:w-full after:h-full after:block after:opacity-75'>
          {upcomingMovies.map((movie, index) => (
            <li key={movie.id} className='snap-center cursor-pointer flex justify-between' onClick={() => setCurrentMovie(index)}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} loading='lazy' className='w-34 h-46 object-cover rounded-lg' />
            </li>
          ))}
        </ul>

        {
          upcomingMovies.length > 0 && (
            <div className='w-1/3 relative'>
              <h3 className='text-rose-600 text-3xl font-semibold mt-2 w-fit'>{upcomingMovies[currentMovie].title}</h3>
              <p className='text-rose-100 text-base w-fit'><span className='text-rose-500 flex items-center'>Up coming in </span>{upcomingMovies[currentMovie].release_date} <i className="ri-calendar-line"></i></p>
              <p className='text-rose-100 text-base text-balance w-fit'>{upcomingMovies[currentMovie].overview}</p>
              <p className='text-rose-100 text-base mt-2 w-fit flex items-center gap-1'><span className='text-rose-500'>Rating</span> {upcomingMovies[currentMovie].vote_average}<i className="ri-star-line"></i></p>
              <p className='text-rose-100 text-base w-fit flex items-center gap-1'><span className='text-rose-500'>Popularity</span> {upcomingMovies[currentMovie].popularity} <i className="ri-group-line"></i></p>
              <p className='text-rose-100 text-base w-fit'><span className='text-rose-500'>Language</span> {upcomingMovies[currentMovie].original_language}</p>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Header;