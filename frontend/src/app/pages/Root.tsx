import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export function Root() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] dark flex flex-col">
      <Navigation />
      <main className="flex-1 relative z-0">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
