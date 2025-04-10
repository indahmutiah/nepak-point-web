import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nepak Point " },
    {
      name: "description",
      content:
        "Simple Ecommerce Website to sell badminton equipment and accessories.",
    },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to Nepak Point</h1>
    </div>
  );
}
