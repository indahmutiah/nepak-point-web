import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { parseHtmlToReact } from "~/lib/html";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product - Nepak Point " },
    {
      name: "description",
      content: "Description of the product",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/products/${params.slug}`
  );
  const product: Product = await response.json();
  return product;
}

export default function ProductSlug({ loaderData }: Route.ComponentProps) {
  const product = loaderData;
  return (
    <div className=" flex-grow container mx-auto m-4 p-4">
      <div
        key={product.id}
        className="flex bg-card rounded-lg overflow-hidden gap-4"
      >
        <div className="aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-2 dark:text-white">
            {product.name}
          </h1>
          <p className="prose text-gray-600 dark:text-gray-300 mb-4">
            {parseHtmlToReact(product.description)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Series: {product.series}
          </p>

          <p className="text-lg font-black text-blue-300 p-4">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
