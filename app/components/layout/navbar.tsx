import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-50">
      <img
        src="/styles/assets/nowastelogo.png"
        alt="NoWaste"
        className="h-10 object-contain"
      />

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
