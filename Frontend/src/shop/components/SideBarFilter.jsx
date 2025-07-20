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
      <button className="bg-red-500 w-full py-2 mb-6 text-white rounded hover:bg-red-600 transition text-sm">
        Aplicar
      </button>

      <h3 className="font-bold mb-2 text-lg">Tallas</h3>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
          <button
            key={size}
            className="border rounded text-sm py-1 px-2 hover:bg-gray-100 text-gray-700"
          >
            {size}
          </button>
        ))}
      </div>

      <h3 className="font-bold mb-2 text-lg">Colores</h3>
      <div className="grid grid-cols-4 gap-2 mb-6 place-items-center">
        {[
          "bg-red-500",
          "bg-blue-500",
          "bg-green-500",
          "bg-yellow-400",
          "bg-black",
          "bg-pink-500",
          "bg-purple-500",
          "bg-gray-500",
        ].map((color, index) => (
          <button
            key={index}
            className={`w-6 h-6 rounded-full border ${color} hover:scale-110 transition-transform`}
          />
        ))}
      </div>
    </aside>
  );
}

export default SidebarFilter;
