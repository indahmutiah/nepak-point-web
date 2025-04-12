import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Form } from "react-router";

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
      <div className="flex flex-row items-center gap-4">
        <Form method="get" action="/search">
          <Input
            name="q"
            placeholder="Search"
            className="w-full rounded-md p-2 border-2 border-slate-300"
          />
        </Form>
      </div>
      <div className="flex items-center gap-4 mr-4">
        <div className="hover:bg-slate-200 rounded-md p-1">
          <a href="/" className="text-slate-500">
            Home
          </a>
        </div>
        <div className="hover:bg-slate-200 rounded-md p-1">
          <a href="/" className="text-slate-500">
            Category
          </a>
        </div>
        <div className="hover:bg-slate-200 rounded-md p-1">
          <a href="/about" className="text-slate-500">
            About
          </a>
        </div>
        <div className="hover:bg-slate-200 rounded-md p-1">
          <User className="w-6 h-6 text-slate-500" />
        </div>
        <div className="hover:bg-slate-200 rounded-md p-1">
          <ShoppingCart className="w-6 h-6 text-slate-500" />
        </div>
      </div>
    </header>
  );
}
