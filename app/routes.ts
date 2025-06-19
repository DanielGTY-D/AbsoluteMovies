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

	...prefix("watchlist", [
		layout("./layouts/MainLayout.tsx", [index("routes/watchlist.tsx")]),
	]),
] satisfies RouteConfig;
