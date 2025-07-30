import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateProduct } from "../../admin/services/adminServices";

const UpdateProduct = () => {
  const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("general");
    const location = useLocation();
    const [form, setForm] = useState({
      name: "",
      description: "",
      category: "",
      subCategory: "",
      image: "",
      variants:[]
    });

    // Cargar datos del producto recibido por navigate state
    useEffect(() => {
      if (location.state && location.state.product) {
        const prod = location.state.product;
        setForm({
          name: prod.name || "",
          description: prod.description || "",
          category: prod.category || prod.sub_category_id?.parent_id?.name || "",
          subCategory: prod.subCategory || prod.sub_category_id?.name || "",
          image: prod.image || (prod.variants && prod.variants[0]?.images?.[0]) || "",
          variants: prod.variants || []
        });
      }
    }, [location.state]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // El id puede venir como _id o id
        const id = (location.state && location.state.product && (location.state.product._id || location.state.product.id));
        if (!id) throw new Error("No se encontró el id del producto");
        await updateProduct(id, form);
        navigate("/Product-Crud");
      } catch (err) {
        console.error("Error al actualizar producto:", err.message);
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
                  <label className="block text-sm font-medium">Categoría</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
  
                <div className="flex-1">
                  <label className="block text-sm font-medium">Sub Categoría</label>
                  <input
                    name="subCategory"
                    value={form.subCategory}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
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
              <label className="block text-sm font-medium mb-2">Variantes del producto</label>
              {(form.variants || []).map((variant, idx) => (
                <div key={idx} className="flex flex-wrap gap-4 mb-2 items-center border-b pb-2">
                  <div>
                    <label className="block text-xs">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={variant.color || ''}
                      onChange={e => {
                        const newVariants = [...(form.variants || [])];
                        newVariants[idx] = { ...newVariants[idx], color: e.target.value };
                        setForm({ ...form, variants: newVariants });
                      }}
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs">Talla</label>
                    <input
                      type="text"
                      name="size"
                      value={variant.size || ''}
                      onChange={e => {
                        const newVariants = [...(form.variants || [])];
                        newVariants[idx] = { ...newVariants[idx], size: e.target.value };
                        setForm({ ...form, variants: newVariants });
                      }}
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs">Precio</label>
                    <input
                      type="number"
                      name="price"
                      value={variant.price || ''}
                      onChange={e => {
                        const newVariants = [...(form.variants || [])];
                        newVariants[idx] = { ...newVariants[idx], price: e.target.value };
                        setForm({ ...form, variants: newVariants });
                      }}
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={variant.stock || ''}
                      onChange={e => {
                        const newVariants = [...(form.variants || [])];
                        newVariants[idx] = { ...newVariants[idx], stock: e.target.value };
                        setForm({ ...form, variants: newVariants });
                      }}
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs">Imágenes (separadas por coma)</label>
                    <input
                      type="text"
                      name="images"
                      value={variant.images ? variant.images.join(', ') : ''}
                      onChange={e => {
                        const newVariants = [...(form.variants || [])];
                        newVariants[idx] = { ...newVariants[idx], images: e.target.value.split(',').map(img => img.trim()) };
                        setForm({ ...form, variants: newVariants });
                      }}
                      className="border rounded px-2 py-1 w-48"
                    />
                  </div>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:underline"
                    onClick={() => {
                      const newVariants = [...(form.variants || [])];
                      newVariants.splice(idx, 1);
                      setForm({ ...form, variants: newVariants });
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setForm({ ...form, variants: [...(form.variants || []), { color: '', size: '', price: '', stock: '', images: [] }] })}
              >
                Agregar variante
              </button>
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

export default UpdateProduct;
