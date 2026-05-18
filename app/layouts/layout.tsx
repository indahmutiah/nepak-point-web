import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/layout";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return { isLoggedIn: session.has("token") };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header isLoggedIn={loaderData.isLoggedIn} />

      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
