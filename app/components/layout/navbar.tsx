import { Bell, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-primary">NoWaste</h1>

      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar..." className="pl-10 h-9" />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-medium">
          E
        </div>
      </div>
    </nav>
  );
}
