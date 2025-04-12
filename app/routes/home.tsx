import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
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

export async function loader({}: Route.LoaderArgs) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/products`);
  const products: Products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;
  // console.log("Products:", products);
  return (
    <div min-h-screen>
      <Header />
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.slug}`}>
              <ProductCard key={product.id} product={product} />
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
