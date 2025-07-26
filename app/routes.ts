import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("movie/:id", "routes/movie.tsx"),
  route("tv/:id", "routes/tv.tsx"),
  route("searchlist/:query/:page", "routes/SearchList.tsx"),
  route("auth/register", "routes/Register.tsx"),
  route("auth/login", "routes/Login.tsx"),
  route("admin/profile", "routes/Profile.tsx"),

  ...prefix("watchlist", [
    layout("./layouts/MainLayout.tsx", [
      route("/:slug/:query/:page?", "routes/watchlist.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
