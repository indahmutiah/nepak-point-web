import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function QtySelector() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="flex items-center gap-2 border bg-blend-darken px-2 py-1 w-fit">
      <Button
        onClick={decrement}
        className="text-gray-500 bg-transparent hover:text-black px-2 text-xl"
      >
        –
      </Button>
      <Input
        type="number"
        value={quantity}
        readOnly
        className="w-15 text-center outline-none border-0 bg-transparent"
      />
      <Button
        onClick={increment}
        className="text-slate-700 bg-transparent hover:text-black px-2 text-xl"
      >
        +
      </Button>
    </div>
  );
}
