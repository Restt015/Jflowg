import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../services/productService";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductCrud() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
          <p className="text-sm text-gray-500">Administra el catálogo de tu tienda</p>
        </div>
        <Link to="/Products/Create">
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            + Nuevo Producto
          </button>
        </Link>
      </div>

      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="text-left border-b text-gray-600">
              <th className="py-2">Producto</th>
              <th className="py-2">Categoría</th>
              <th className="py-2">Precio</th>
              <th className="py-2">Stock</th>
              <th className="py-2">Estado</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
              const variant = product.variants?.[0] || {};
              const stock = variant.stock || 0;
              const isActive = stock > 0;

              return (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="flex items-center gap-3 py-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold ${product.category === "Ropa"
                          ? "bg-red-600"
                          : product.category === "Calzado"
                            ? "bg-green-600"
                            : "bg-gray-600"
                        }`}
                    >
                      {product.variants[0].images[0] ?
                       <img src={product.variants[0].images[0]} alt={product.variants[0].name} className="rounded-3xl" />
                       :
                       "?"
                      }
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.description}</p>
                    </div>
                  </td>
                  <td>
                    <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                      {product.sub_category_id.name || "Sin categoría"}
                    </span>
                  </td>
                  <td>${variant.price?.toFixed(2) || "0.00"}</td>
                  <td>
                    <span className="text-green-600 font-medium">
                      {stock} unidades
                    </span>
                  </td>
                  <td>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="flex-1 space-x-5">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Pencil size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
