import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { parseHtmlToReact } from "~/lib/html";
import { Form, Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { destroySession, getSession } from "~/sessions.server";
import type { User } from "~/modules/user/type";
import type { AddCartItem } from "~/modules/cart/schema";

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

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }

  const token = session.get("token");

  const formData = await request.formData();

  const addCartItemData: AddCartItem = {
    productId: String(formData.get("productId")),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(`${process.env.BACKEND_API_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addCartItemData),
  });
  if (!response.ok) {
    session.flash("error", "Failed to add item to chart");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  return redirect("/cart");
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
            className=" w-full h-full object-cover "
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
          <div className="flex flex-col gap-4 p-4">
            <Form method="post" className="flex gap-4 ">
              <input type="hidden" name="productId" value={product.id} />
              <input
                type="number"
                name="quantity"
                defaultValue={1}
                min={1}
                max={product.stock}
                className="w-20 bg-card rounded-md p-2 pl-4 border-2 border-slate-300"
              />
              <Button
                type="submit"
                className="w-50 h-11 bg-slate-600 text-slate-900 hover:bg-slate-500 transition duration-200"
              >
                Add to Cart
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
