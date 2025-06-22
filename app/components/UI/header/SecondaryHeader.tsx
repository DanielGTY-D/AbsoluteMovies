
import { useState } from 'react';
import { Link, Form } from 'react-router'


const SecondaryHeader = () => {
  const [showDropdownMovie, setShowDropdownMovie] = useState(false);
  const [showDropdownSerie, setShowDropdownSerie] = useState(false);

  
  return (
    <>
      <header className="bg-rose-900 py-5 px-2.5">
        <nav className="container mx-auto lg:max-w-6xl flex items-end justify-between">
          <div className="flex items-center gap-4">
            <i className="ri-film-fill text-6xl text-rose-50"></i>
            <Link to={`/`}>
              <h1 className="text-3xl xl:text-6xl font-bold text-rose-50 capitalize">Absolute Movies</h1>
            </Link>
          </div>

          <ul className="flex gap-4 items-center">
            <div className='relative group'>
              <button className='cursor-pointer text-white flex items-center gap-2 text-lg font-semibold' onClick={() => setShowDropdownMovie(!showDropdownMovie)}>
                Movies
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <ul className={`absolute bg-rose-800 text-rose-100 rounded-lg overflow-hidden cursor-pointer transform group-hover:scale-100 ${showDropdownMovie ? "scale-100" : "scale-0"} transition-transform duration-500 ease-in-out md:delay-300`}>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/popular"}>Populares</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/listings"}>En Cartelera</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/best-raiting"}>Mejor Valoradas</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/premieres"}>Estrenos</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/premieres"}>Movies</Link></li>
              </ul>
            </div>

            <div className='relative group'>
              <button className='text-white cursor-pointer flex items-center gap-2 text-lg font-semibold' onClick={() => setShowDropdownSerie(!showDropdownSerie)}>
                Series
                <i className="ri-arrow-down-s-line"></i>
              </button>
              <ul className={`absolute bg-rose-800 text-rose-100 rounded-lg overflow-hidden cursor-pointer transform group-hover:scale-100 ${showDropdownSerie ? "scale-100" : "scale-0"} transition-transform duration-500 ease-in-out md:delay-300`}>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/series/popular"}>Populares</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/series/on-airing"}>En Emision</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/series/best-raiting"}>Mejor Valoradas</Link></li>
                <li className='text-base text-nowrap p-2 hover:bg-rose-500 transition-colors duration-300'><Link to={"/movies/premieres"}>Series</Link></li>
              </ul>
            </div>

            <div className='flex items-center gap-2'>
              <Link className='text-white text-lg font-semibold text-nowrap' to={"/acount/log-in"}>log In</Link>
              <Link className='text-white text-lg font-semibold text-nowrap' to={"/acount/sign-up"}>Sign Up</Link>
            </div>

            <Form className='' method='POST' action='/search'>
              <div className='flex items-center bg-rose-800 py-1 px-2 rounded-sm'>
                <label htmlFor="search" className='text-white '></label>
                <input type="text" id='search' name='search' className='w-auto h-auto placeholder:text-white outline-none bg-rose-800 text-white' placeholder='type to search' />
              </div>
            </Form>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default SecondaryHeader;
