import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import { getAllUsers } from "../../services/userService";
import AdminSidebar from "../components/shared/AdminSidebar";

export default function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));


    const fetchDashboardData = async () => {
      try {
        const resProducts = await getAllProducts();
        setTotalProducts(resProducts?.data?.count || 0);

        const resUsers = await getAllUsers();
        const onlyUsers = resUsers?.users?.filter(u => u.role === 200) || [];
        setTotalUsers(onlyUsers.length);
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
     <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
            <p className="text-sm text-gray-500">Bienvenido al sistema de gestión administrativa</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Administrador</p>
                <p className="text-xs text-gray-500">{user?.name} {user?.lastname} </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-lg p-5 shadow border">
            <p className="text-sm text-gray-500">Total Productos</p>
            <h2 className="text-3xl font-bold text-gray-800">{totalProducts}</h2>
            <p className="text-xs text-green-600 mt-1">+12% vs mes anterior</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow border">
            <p className="text-sm text-gray-500">Pedidos Activos</p>
            <h2 className="text-3xl font-bold text-gray-800">--</h2>
          </div>
          <div className="bg-white rounded-lg p-5 shadow border">
            <p className="text-sm text-gray-500">Devoluciones</p>
            <h2 className="text-3xl font-bold text-gray-800">--</h2>
          </div>
          <div className="bg-white rounded-lg p-5 shadow border">
            <p className="text-sm text-gray-500">Usuarios</p>
            <h2 className="text-3xl font-bold text-gray-800">{totalUsers}</h2>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Actividad Reciente</h3>
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
              <p className="text-sm text-gray-600">
                Nuevo pedido procesado <br />
                <span className="text-xs text-gray-400">Pedido #ORD-2024-156 - $299.99</span>
              </p>
            </div>
            <p className="text-xs text-gray-400">Hace 5 min</p>
          </div>
          <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto"></div>
        </div>
      </main>
    </div>
  );
}
