import type { Route } from "./+types/home";
import { Header } from "../components/header"; // Adjust the path as needed
import { Footer } from "../components/footer"; // Adjust the path as needed

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
type Product = {
  id: string;
  name: string;
  slug: string;
  series: string | null;
  description: string | null;
  price: number;
  imageUrl: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Products = Product[];

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(`http://localhost:3000/products`);
  const products: Products = await response.json();
  return products;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;
  console.log("Products:", products);
  return (
    <div>
      <Header />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Category: {product.categoryId}</p>
            <p>Series: {product.series}</p>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
