import type { Product } from "~/modules/product/type";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

export function ProductCard({ product }: { product: Product }) {
  return (
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
          <h2 className="text-lg font-black text-blue-300">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
