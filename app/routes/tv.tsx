

import type { Route } from "./+types/tv";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Absolute Movies - Home" },
    { name: "description", content: "tv serie" },
  ];
}

const Tv = () => {
  return (
    <>
      <h1>Desde tv series</h1>
    </>
  );
};

export default Tv;