import React, { useState } from 'react';

// Componente para las pestañas
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      active
        ? 'border-red-500 text-red-600 bg-red-50'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    {children}
  </button>
);

// Componente para campos de formulario
const FormField = ({ label, children, required = false }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

// Componente para inputs
const Input = ({ type = "text", placeholder, value, onChange, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    {...props}
  />
);

// Componente para textarea
const Textarea = ({ placeholder, value, onChange, rows = 4, ...props }) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
    {...props}
  />
);

// Componente para select
const Select = ({ value, onChange, options, placeholder, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Componente principal
const ProductManagementPanel = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '0.00',
    descripcion: '',
    categoria: '',
    stockTotal: '0'
  });

  const tabs = [
    { id: 'general', label: 'Información General' },
    { id: 'imagenes', label: 'Imágenes' },
    { id: 'tallas', label: 'Tallas y Stock' }
  ];

  const categorias = [
    { value: '', label: 'Selecciona una categoría' },
    { value: 'camisetas', label: 'Camisetas' },
    { value: 'pantalones', label: 'Pantalones' },
    { value: 'chaquetas', label: 'Chaquetas' },
    { value: 'zapatos', label: 'Zapatos' },
    { value: 'accesorios', label: 'Accesorios' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div>
              <FormField label="Nombre del Producto" required>
                <Input
                  placeholder="Ingresa el nombre del producto"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                />
              </FormField>

              <FormField label="Descripción">
                <Textarea
                  placeholder="Describe el producto..."
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  rows={6}
                />
              </FormField>

              <FormField label="Categoría" required>
                <Select
                  value={formData.categoria}
                  onChange={(e) => handleInputChange('categoria', e.target.value)}
                  options={categorias.slice(1)}
                  placeholder="Selecciona una categoría"
                />
              </FormField>
            </div>

            {/* Columna derecha */}
            <div>
              <FormField label="Precio" required>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precio}
                    onChange={(e) => handleInputChange('precio', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </FormField>

              <FormField label="Stock Total" required>
                <Input
                  type="number"
                  min="0"
                  value={formData.stockTotal}
                  onChange={(e) => handleInputChange('stockTotal', e.target.value)}
                />
              </FormField>
            </div>
          </div>
        );

      case 'imagenes':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-gray-400 transition-colors">
                <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sube las imágenes del producto
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Arrastra y suelta archivos aquí o haz clic para seleccionar
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Seleccionar Archivos
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-400">Imagen {item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tallas':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Gestión de Tallas y Stock
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Talla</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Stock</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Precio</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((talla) => (
                      <tr key={talla} className="border-b border-gray-100">
                        <td className="py-2 px-3 text-sm font-medium">{talla}</td>
                        <td className="py-2 px-3">
                          <Input
                            type="number"
                            min="0"
                            placeholder="0"
                            className="w-20"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="w-24"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <Select
                            options={[
                              { value: 'activo', label: 'Activo' },
                              { value: 'inactivo', label: 'Inactivo' }
                            ]}
                            className="w-28"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900 text-center">
              Panel de Administración
            </h1>
            <p className="text-gray-600 text-center mt-1">
              Gestiona los productos de tu tienda
            </p>
          </div>

          <div className="px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Información del Producto
            </h2>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 -mb-px">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </TabButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderTabContent()}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
              Guardar Borrador
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Publicar Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPanel;