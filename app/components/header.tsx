import { User } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Input } from "~/components/ui/input";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/products/search?q=${query}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
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
          <Input
            type="text"
            placeholder="Search..."
            className="bg-slate-200 text-slate-400"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-2 z-10">
              <ul>
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
