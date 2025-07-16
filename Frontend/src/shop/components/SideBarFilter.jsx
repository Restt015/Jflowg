import React from "react";

function SidebarFilter() {
  return (
    <aside className="w-full sm:w-64 p-4 bg-white rounded-xl shadow mb-6 sm:mb-0">
      <h3 className="font-bold mb-4 text-lg">Categorías</h3>
      <ul className="space-y-2 mb-6">
        <li><button className="hover:underline">Ropa</button></li>
        <li><button className="hover:underline">Gorras</button></li>
        <li><button className="hover:underline">Pantalones</button></li>
        <li><button className="hover:underline">Accesorios</button></li>
      </ul>

      <h3 className="font-bold mb-2 text-lg">Precio</h3>
      <div className="flex gap-2 mb-4">
        <input className="w-1/2 border rounded p-1 text-sm" placeholder="Min" />
        <input className="w-1/2 border rounded p-1 text-sm" placeholder="Max" />
      </div>
      <button className="bg-red-500 w-full py-2 text-white rounded hover:bg-red-600 transition text-sm">
        Aplicar
      </button>
    </aside>
  );
}

export default SidebarFilter;


