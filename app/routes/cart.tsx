import { redirect } from "react-router";
import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/cart";
import type { Cart } from "~/modules/cart/schema";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }

  const token = session.get("token");

  const response = await fetch(`${process.env.BACKEND_API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  const cart: Cart = await response.json();

  return cart;
}

export default function CartPage({ loaderData }: Route.ComponentProps) {
  const subtotal = loaderData.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {loaderData.items.length === 0 ? (
        <p className="text-slate-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {loaderData.items.map((item) => {
            const lineTotal = item.product.price * item.quantity;

            return (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <CardTitle className="text-lg">
                        {item.product.name}
                      </CardTitle>
                    </div>
                    <span className="text-lg font-black text-blue-300">
                      {formatCurrency(item.product.price)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-1">
                  <p className="text-blue-300 text-lg">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-slate-400">
                    {formatCurrency(item.product.price)} × {item.quantity}
                  </p>
                  <p className="text-lg font-semibold text-blue-300">
                    Line total: {formatCurrency(lineTotal)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="flex flex-col items-end gap-4 mt-6">
        <div className="flex gap-2 text-xl">
          <span className="font-black text-slate-600">Subtotal:</span>
          <span className="font-black text-blue-300">
            {formatCurrency(subtotal)}
          </span>
        </div>
        {loaderData.items.length > 0 && (
          <Button className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-900">
            Checkout
          </Button>
        )}
      </div>
    </div>
  );
}
