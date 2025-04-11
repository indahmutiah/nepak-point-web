import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Form } from "react-router";

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
export function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full h-16 bg-card">
      <a href="/" className="flex flex-row items-center">
        <img
          src="/images/nepak-icon.png"
          alt="logo"
          className="w-24 h-13 rounded-md ml-4"
        />
      </a>

      <div className="flex items-center gap-4 mr-4">
        <div className="hover:bg-slate-200 rounded-md p-1">
          <User className="w-6 h-6 text-slate-700" />
        </div>
        <div className="hover:bg-slate-200 rounded-md p-1">
          <ShoppingCart className="w-6 h-6 text-slate-700" />
        </div>
        <div className="w-80">
          <Form action="/search">
            <Input
              name="q"
              type="search"
              placeholder="Search..."
              className="bg-slate-200 text-slate-400"
            />
          </Form>
        </div>
      </div>
    </header>
  );
}
