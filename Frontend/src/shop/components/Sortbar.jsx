import React from "react";

function SortBar() {
  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <p className="text-sm text-gray-600">639 productos</p>
      <div className="flex items-center gap-2">
        <select className="border rounded px-2 py-1 text-sm">
          <option>Más relevante</option>
          <option>Precio: menor a mayor</option>
          <option>Precio: mayor a menor</option>
        </select>
        <div className="flex gap-1 ml-2">
          <button title="Vista de lista" className="border rounded p-1 text-sm">📃</button>
          <button title="Vista de grilla" className="border rounded p-1 text-sm">🔳</button>
        </div>
      </div>
    </div>
  );
}

export default SortBar;
