import React from "react";
import AdminSidebar from "../components/shared/AdminSidebar";

export default function GestionDevolucion() {
  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Devoluciones</h1>
        <p className="text-gray-600 text-sm mb-6">
          Esta funcionalidad estará disponible próximamente. Estamos trabajando en ello.
        </p>
        <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
           Módulo en construcción
        </span>
      </main>
    </div>
  );
}
