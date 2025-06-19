
import type { Route } from "./+types/movie";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Absolute Movies - Home" },
    { name: "description", content: "movies" },
  ];
}

const Movie = () => {
  return (
    <>
      <h1>Desde Movies</h1>
    </>
  );
};

export default Movie;