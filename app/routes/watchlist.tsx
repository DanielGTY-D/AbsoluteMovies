
import type { Route } from "./+types/watchlist";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Absolute Movies - watchlist" },
    { name: "description", content: "watchlist for movies or tv series" },
  ];
}

const WatchList = () => {
  return (
    <>
      <h1>Desde watchlist</h1>
    </>
  );
};

export default WatchList;