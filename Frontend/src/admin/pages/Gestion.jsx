import React, { useState } from 'react';
import { Search, Eye, Lock, Edit } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      status: 'Suspendido',
      role: 'Cliente',
      lastAccess: '2024-01-15 14:23',
      orders: 12,
      statusColor: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      status: 'Inactivo',
      role: 'Cliente',
      lastAccess: '2024-01-10 09:15',
      orders: 5,
      statusColor: 'bg-gray-500'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      status: 'Activo',
      role: 'Vendedor',
      lastAccess: '2024-01-18 16:45',
      orders: 8,
      statusColor: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Luis Fernández',
      email: 'luis.fernandez@email.com',
      status: 'Inactivo',
      role: 'Cliente',
      lastAccess: '2024-01-08 12:00',
      orders: 3,
      statusColor: 'bg-gray-500'
    }
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Suspendido':
        return 'bg-red-100 text-red-800';
      case 'Inactivo':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-sm text-gray-500 mt-1">Gestión de cuentas de usuario</p>
            </div>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Línea de auditoría
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* User Management Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Gestión de Usuarios</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Total 4 usuarios</span>
                <span className="text-sm text-green-600 font-medium">Activos 1</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o correo electrónico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      USUARIO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ESTADO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ÚLTIMO ACCESO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PEDIDOS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 ${user.statusColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-sm font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.lastAccess}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.orders}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Eye size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Lock size={16} />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Edit size={16} />
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

export default UserManagement;