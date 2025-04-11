import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import type { Products } from "~/modules/product/type";
import { ProductCard } from "~/components/product-card";
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
      <Header />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
