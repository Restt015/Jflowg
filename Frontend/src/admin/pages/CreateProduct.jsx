import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../admin/services/adminServices";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      alert("Producto creado con éxito");
      navigate("/Product-Crud");
      
    } catch (err) {
      console.error("Error al crear producto:", err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-1">Panel de Administración</h2>
      <p className="text-center mb-6 text-gray-500">Gestiona los productos de tu tienda</p>

      <form onSubmit={handleSubmit} className="bg-white rounded shadow-md p-6 space-y-4">
        <h3 className="font-semibold text-lg mb-2">Información del Producto</h3>

      
        <div className="flex gap-2 border-b">
          {["general", "imagenes", "stock"].map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 font-medium ${
                activeTab === tab ? "border-red-500 text-red-500" : "border-transparent text-gray-500"
              }`}
            >
              {tab === "general" ? "Información General" : tab === "imagenes" ? "Imágenes" : "Tallas y Stock"}
            </button>
          ))}
        </div>

       
        {activeTab === "general" && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Nombre del producto</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Descripción</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                rows="3"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Categoría</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Stock total</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "imagenes" && (
          <div>
            <label className="block text-sm font-medium">Imágenes del producto (URL)</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
        )}

        {activeTab === "stock" && (
          <div>
            <p className="text-gray-500 text-sm"></p>
          
          </div>
        )}
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            className="border px-4 py-2 rounded"
            onClick={() => navigate("/Product-Crud")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => navigate("/Product-Crud")}
          >
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
