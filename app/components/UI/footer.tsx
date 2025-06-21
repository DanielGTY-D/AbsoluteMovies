import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-rose-800 list-none py-20 px-5 flex flex-row-reverse justify-between">
            <nav className="flex items-center gap-3.5">
                <li className="btn-hover">
                    <Link className="text-white font-semibold " to={``}>
                        Algun Link
                    </Link>
                </li>
                <li className="btn-hover">
                    <Link className="text-white font-semibold" to={``}>Algun Link</Link>
                </li>
                <li className="btn-hover">
                    <Link className="text-white font-semibold" to={``}>Algun Link</Link>
                </li>
            </nav>
            <div className="w-1/2">
                <h1 className="text-white text-2xl font-semibold">Absolute Movies</h1>

                <p className="text-white text-sm mt-2 font-semibold">
                    Descubre reseñas, calificaciones y las últimas novedades del mundo del cine en Absolute Movies.
                </p>
            </div>
        </footer>
    )
}

export default Footer;