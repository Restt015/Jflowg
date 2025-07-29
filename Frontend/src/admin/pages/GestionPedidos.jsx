import React, { useState } from 'react';
import { Search, Eye, Download, MoreHorizontal } from 'lucide-react';

const OrdersManagement = () => {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { name: 'Todos', count: 15, color: 'bg-red-500' },
    { name: 'Pendientes', count: 1, color: 'bg-gray-500' },
    { name: 'Procesando', count: 1, color: 'bg-gray-500' },
    { name: 'Enviados', count: 1, color: 'bg-gray-500' },
    { name: 'Entregados', count: 1, color: 'bg-gray-500' },
    { name: 'Cancelados', count: 1, color: 'bg-gray-500' }
  ];

  const orders = [
    {
      id: 'ORD-2024-005',
      customer: 'Pedro Ruiz',
      email: 'pedro.ruiz@email.com',
      status: 'Procesando',
      statusColor: 'bg-blue-100 text-blue-800',
      total: '$267.87',
      date: '01/01/2025, 12:00',
      method: '',
      actions: ['view', 'download', 'more']
    },
    {
      id: 'ORD-2024-001',
      customer: 'María González',
      email: 'maria.gonzalez@email.com',
      status: 'Pendiente',
      statusColor: 'bg-orange-100 text-orange-800',
      total: '$89.87',
      date: '01/01/2025, 10:30',
      method: '',
      actions: ['view', 'download', 'more']
    },
    {
      id: 'ORD-2024-002',
      customer: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      status: 'En tránsito',
      statusColor: 'bg-purple-100 text-purple-800',
      total: '$219.89',
      date: '01/01/2025, 14:20',
      method: 'RESTATURISTA',
      actions: ['view', 'download', 'more']
    },
    {
      id: 'ORD-2024-004',
      customer: 'Luis Fernández',
      email: 'luis.fernandez@email.com',
      status: 'Cancelado',
      statusColor: 'bg-red-100 text-red-800',
      total: '$45.89',
      date: '14/01/2025, 10:45',
      method: '',
      actions: ['view', 'download', 'more']
    },
    {
      id: 'ORD-2024-003',
      customer: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      status: 'Entregado',
      statusColor: 'bg-green-100 text-green-800',
      total: '$159.89',
      date: '12/01/2025, 09:15',
      method: 'ENTREGAREASI',
      actions: ['view', 'download', 'more']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-100 px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600">Panel de Administración / Gestión de Pedidos</p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-sm text-gray-500 mt-1">Gestión de pedidos</p>
            </div>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Orders Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Pedidos</h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    activeTab === tab.name
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por ID, cliente o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PEDIDO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CLIENTE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ESTADO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TOTAL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      FECHA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SEGUIMIENTO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">Pedido online</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.total}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600">{order.method}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Eye size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Download size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;