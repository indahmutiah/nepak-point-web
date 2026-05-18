import { LogIn, LogOut, UserPlus } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Form, Link } from "react-router";

type HeaderProps = {
  isLoggedIn: boolean;
};

export function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between items-center w-full h-16 bg-card">
      <a href="/" className="flex flex-row items-center">
        <img
          src="/images/nepak-icon.png"
          alt="logo"
          className="w-24 h-13 rounded-md ml-4"
        />
      </a>
      <div className="flex flex-row items-center pl-16">
        <Form method="get" action="/search">
          <Input
            name="q"
            placeholder="Search"
            className="w-full rounded-md p-2 pl-4 border-2 border-slate-300"
          />
        </Form>
      </div>
      <nav className="flex items-center gap-4 mr-4">
        <ul className="flex items-center gap-4">
          <li className="hover:bg-slate-200 rounded-md p-1">
            <a href="/" className="text-slate-500">
              Home
            </a>
          </li>
          <li className="hover:bg-slate-200 rounded-md p-1">
            <a href="/about" className="text-slate-500">
              About
            </a>
          </li>

          {isLoggedIn ? (
            <li className="hover:bg-slate-200 rounded-md p-1">
              <Form method="post" action="/logout">
                <button
                  type="submit"
                  className="flex items-center text-slate-500"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="ml-2">Logout</span>
                </button>
              </Form>
            </li>
          ) : (
            <>
              <li className="hover:bg-slate-200 rounded-md p-1">
                <Link to="/login" className="flex items-center text-slate-500">
                  <LogIn className="w-6 h-6" />
                  <span className="ml-2">Login</span>
                </Link>
              </li>
              <li className="hover:bg-slate-200 rounded-md p-1">
                <Link
                  to="/register"
                  className="flex items-center text-slate-500"
                >
                  <UserPlus className="w-6 h-6" />
                  <span className="ml-2">Register</span>
                </Link>
              </li>
            </>
          )}

          <li className="hover:bg-slate-200 rounded-md p-1">
            <Link to="/cart">
              <ShoppingCart className="w-6 h-6 text-slate-500" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
