import { LayoutDashboard, Package, ShoppingCart, MessageSquare, BarChart3, CreditCard } from "lucide-react";
import { Link, useLocation } from "react-router";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Package, label: "Meus Resíduos", path: "/residuos" },
  { icon: ShoppingCart, label: "Marketplace", path: "/marketplace" },
  { icon: MessageSquare, label: "Negociações", path: "/negociacoes" },
  { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
  { icon: CreditCard, label: "Planos", path: "/planos" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
