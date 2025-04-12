import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

export default function Layout() {
  return (
    <>
      <Header />

      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
