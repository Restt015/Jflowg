import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  RotateCcw,
  Users
} from "lucide-react";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const menu = [
    {
      label: "Panel de Administración",
      to: "/Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Gestión de Productos",
      to: "/Product-Crud",
      icon: <Package size={18} />,
    },
    {
      label: "Gestión de Pedidos",
      to: "/Gestion-Pedidos",
      icon: <ShoppingCart size={18} />,
    },
    {
      label: "Gestión de Devoluciones",
      to: "/Gestion-Devolution",
      icon: <RotateCcw size={18} />,
    },
    {
      label: "Gestión de Usuarios",
      to: "/Gestion-User",
      icon: <Users size={18} />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 shadow-sm">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-red-600">Admin Panel</h2>
        <p className="text-sm text-gray-500">Sistema de gestión</p>
      </div>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
              pathname === item.to
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10 px-3 text-xs text-gray-400">
        <button className="flex items-center gap-2 hover:underline">
          Contraer
        </button>
      </div>
    </aside>
  );
}
