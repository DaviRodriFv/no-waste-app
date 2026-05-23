import { useState } from "react";
import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function MainLayout() {
  const [mode, setMode] = useState<"sell" | "buy">("buy");

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar mode={mode} onModeChange={setMode} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Outlet context={{ mode }} />
        </main>
      </div>
    </div>
  );
}
