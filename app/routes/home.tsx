import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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
  const response = await fetch(`${process.env.BACKEND_API_URL}/products`);
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="w-full h-full bg-card rounded-md shadow-md"
          >
            <div className="relative w-full h-full">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-100 object-cover rounded-t-md"
              />
            </div>

            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-2">
                {product.name}
              </CardTitle>
              <div className="flex justify-between text-sm text-muted-foreground">
                <p>{product.series}</p>
              </div>
              <div className="pt-4">
                <h2 className="text-lg font-black text-primary">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(product.price)}
                </h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
}
