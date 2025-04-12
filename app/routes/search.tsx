import type { Route } from "./+types/home";
import type { Products } from "~/modules/product/type";
import { ProductCard } from "~/components/product-card";
import { Link } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nepak Point " },
    {
      name: "description",
      content:
        "Simple Ecommerce Website to sell badminton equipment and accessories.",
    },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/products/search?q=${q}`
  );
  const products: Products = await response.json();
  return products;
}
export default function Search({ loaderData }: Route.ComponentProps) {
  const products = loaderData;
  return (
    <div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.slug}`}>
              <ProductCard key={product.id} product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
