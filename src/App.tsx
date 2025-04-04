import { Header } from "./components/header";
import { Footer } from "./components/footer";
export default function App() {
  return (
    <>
      <Header />
      <div className="bg-background h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center mt-10 text-white">
          Nepak Point
        </h1>
      </div>
      <Footer />
    </>
  );
}
