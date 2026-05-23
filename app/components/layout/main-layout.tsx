import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
