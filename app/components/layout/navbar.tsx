import { Bell, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface NavbarProps {
  mode: "sell" | "buy";
  onModeChange: (mode: "sell" | "buy") => void;
}

export function Navbar({ mode, onModeChange }: NavbarProps) {
  return (
    <nav className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-primary">NoWaste</h1>
      </div>

      {/* Mode Toggle - Center */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex bg-muted rounded-lg p-1">
        <button
          onClick={() => onModeChange("sell")}
          className={`px-6 py-2 rounded-md transition-all ${
            mode === "sell"
              ? "bg-primary text-white"
              : "text-foreground hover:text-primary"
          }`}
        >
          Vender Resíduos
        </button>
        <button
          onClick={() => onModeChange("buy")}
          className={`px-6 py-2 rounded-md transition-all ${
            mode === "buy"
              ? "bg-primary text-white"
              : "text-foreground hover:text-primary"
          }`}
        >
          Comprar Insumos
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="pl-10 h-9"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* User Avatar */}
        <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-medium">
          E
        </div>
      </div>
    </nav>
  );
}
