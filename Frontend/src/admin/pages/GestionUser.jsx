import React, { useState, useEffect } from 'react';
import { Search, Eye, Lock, Edit, X } from 'lucide-react';
import { getAllUsers } from '../../services/userService';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        setUsers(response.users || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al cargar usuarios');
        console.error('Error al cargar usuarios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Modal de detalles del usuario
  const UserDetailsModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Detalles del Usuario</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 ${user.statusColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-lg font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusBadgeColor(user.status)}`}>
                  {user.status}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`pb-2 text-sm font-medium transition-colors ${
                    activeTab === 'personal'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Información Personal
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`pb-2 text-sm font-medium transition-colors ${
                    activeTab === 'activity'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Actividad
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'personal' && (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">TELÉFONO</p>
                  <p className="text-sm text-gray-900">+34 612 345 678</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">DIRECCIÓN</p>
                  <p className="text-sm text-gray-900">Calle Mayor 123, Madrid</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">FECHA DE REGISTRO</p>
                  <p className="text-sm text-gray-900">2023-06-15</p>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">ÚLTIMO ACCESO</p>
                  <p className="text-sm text-gray-900">{user.lastAccess}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">TOTAL DE PEDIDOS</p>
                  <p className="text-sm text-gray-900">{user.orders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">TOTAL GASTADO</p>
                  <p className="text-sm text-gray-900">€1250.50</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-6">
              <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-red-700 transition-colors">
                Suspender Cuenta
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-red-700 transition-colors">
                Desactivar
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                Restablecer Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                <span className="text-sm text-gray-600">Total {users.length} usuarios</span>
                <span className="text-sm text-green-600 font-medium">
                  Activos {users.filter(user => user.isActive !== false).length}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Cargando usuarios...</span>
              </div>
            ) : (
              <>
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
                      {users
                        .filter(user => 
                          (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
                        )
                        .map((user) => {
                          const userName = `${user.name || ''} ${user.lastName || ''}`.trim();
                          const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
                          const statusColor = user.isActive === false ? 'bg-red-500' : 'bg-green-500';
                          const statusText = user.isActive === false ? 'Inactivo' : 'Activo';
                          
                          return (
                            <tr key={user._id || user.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className={`w-10 h-10 ${statusColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    <span className="text-white text-sm font-semibold">
                                      {userInitials || 'U'}
                                    </span>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{userName || 'Sin nombre'}</div>
                                    <div className="text-sm text-gray-500">{user.email || 'Sin email'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(statusText)}`}>
                                  {statusText}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{user.role || 'Cliente'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {user.lastAccess ? new Date(user.lastAccess).toLocaleString() : 'N/A'}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{user.orders || 0}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => setSelectedUser(user)}
                                    className="text-gray-600 hover:text-gray-900 p-1"
                                  >
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
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalles del usuario */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default UserManagement;