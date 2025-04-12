import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/search", "routes/search.tsx"),
  route("/products/:slug", "routes/product-slug.tsx"),
  route("/about", "routes/about.tsx"),
] satisfies RouteConfig;
