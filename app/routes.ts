import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"),
    route("/search", "routes/search.tsx"),
    route("/products/:slug", "routes/products-slug.tsx"),
    route("/about", "routes/about.tsx"),
    route("/login", "routes/login.tsx"),
    route("/register", "routes/register.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),
    route("/cart", "routes/cart.tsx"),
  ]),
] satisfies RouteConfig;
