import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";

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
      </div>
    </header>
  );
}
