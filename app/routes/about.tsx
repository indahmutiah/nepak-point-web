import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

export default function ProductSlug() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className=" flex-grow container mx-auto m-4 p-4">
        <div className="flex bg-card rounded-lg overflow-hidden gap-4">
          <div>
            <div className="border-b border-gray-200">
              <h2 className="text-2xl font-bold p-4">About Nepak Point</h2>
            </div>

            <p className="p-4">
              This is a simple Ecommerce Website to sell badminton equipment and
              accessories.
              <br />
              <div className="flex flex-row gap-4 py-6 border-b border-gray-200">
                <h2 className="text-xl font-bold">Version 1.0 🚀 </h2>
              </div>
              <p>
                The app first release was made in 2025. The app is still in
                development and there are many features that need to be added.
              </p>
              <div className="flex flex-row gap-4 py-8">
                <p>Greetings from the creator of this app, Enjoy!</p>
              </div>
              <div className="flex flex-row gap-4 py-4">
                <a
                  href="https://www.linkedin.com/in/indah-mutiah-utami-mz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 underline"
                >
                  Indah Mutiah MZ
                </a>
              </div>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
