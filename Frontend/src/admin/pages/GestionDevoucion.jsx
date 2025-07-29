import React, { useState } from 'react';
import { Search, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const solicitudes = [
    {
      id: 'BET-2024-005',
      fecha: '2024-01-30 - 2024-01-30',
      cliente: 'Elena Ruiz',
      email: 'elena.ruiz@email.com',
      motivo: 'Artículo incorrecto',
      detalle: '1 producto(s)',
      estado: 'En Revisión',
      importe: '109.99 $',
      fechaAccion: '30/01/2024, 16:00'
    },
    {
      id: 'BET-2024-004',
      fecha: '2024-01-29 - 2024-01-29',
      cliente: 'Mario González',
      email: 'mario.gonzalez@email.com',
      motivo: 'Producto defectuoso',
      detalle: '1 producto(s)',
      estado: 'Pendiente',
      importe: '19.99 $',
      fechaAccion: '29/01/2024, 14:30'
    },
    {
      id: 'BET-2024-002',
      fecha: '2024-01-28 - 2024-01-28',
      cliente: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      motivo: 'Talla incorrecta',
      detalle: '1 producto(s)',
      estado: 'Aprobado',
      importe: '89.99 $',
      fechaAccion: '28/01/2024, 10:20'
    },
    {
      id: 'BET-2024-003',
      fecha: '2024-01-27 - 2024-01-27',
      cliente: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      motivo: 'No me gusta',
      detalle: '1 producto(s)',
      estado: 'Rechazado',
      importe: '0.00 $',
      fechaAccion: '27/01/2024, 09:15'
    },
    {
      id: 'BET-2024-001',
      fecha: '2024-01-26 - 2024-01-26',
      cliente: 'Luis Fernández',
      email: 'luis.fernandez@email.com',
      motivo: 'Producto dañado en envío',
      detalle: '1 producto(s)',
      estado: 'Reembolsado',
      importe: '24.99 $',
      fechaAccion: '26/01/2024, 11:30'
    }
  ];

  const filters = [
    { name: 'Todos', count: 5, color: 'bg-gray-100 text-gray-800' },
    { name: 'Pendientes', count: 1, color: 'bg-gray-100 text-gray-800' },
    { name: 'En Revisión', count: 1, color: 'bg-gray-100 text-gray-800' },
    { name: 'Aprobados', count: 1, color: 'bg-gray-100 text-gray-800' },
    { name: 'Rechazados', count: 1, color: 'bg-gray-100 text-gray-800' },
    { name: 'Reembolsados', count: 1, color: 'bg-gray-100 text-gray-800' }
  ];

  const getStatusColor = (estado) => {
    const colors = {
      'En Revisión': 'bg-blue-100 text-blue-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Aprobado': 'bg-green-100 text-green-800',
      'Rechazado': 'bg-red-100 text-red-800',
      'Reembolsado': 'bg-purple-100 text-purple-800'
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const matchesSearch = solicitud.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solicitud.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solicitud.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'Todos' || 
                         (activeFilter === 'Pendientes' && solicitud.estado === 'Pendiente') ||
                         (activeFilter === 'En Revisión' && solicitud.estado === 'En Revisión') ||
                         (activeFilter === 'Aprobados' && solicitud.estado === 'Aprobado') ||
                         (activeFilter === 'Rechazados' && solicitud.estado === 'Rechazado') ||
                         (activeFilter === 'Reembolsados' && solicitud.estado === 'Reembolsado');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-1">Gestión de devoluciones y reembolsos</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <span>📊</span>
              Reportes
            </button>
          </div>

          {/* Filters */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 -mb-px">
              {filters.map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => setActiveFilter(filter.name)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeFilter === filter.name
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {filter.name} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Search and Actions */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Solicitudes de Devolución
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por ID, cliente o cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solicitud
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Importe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSolicitudes.map((solicitud) => (
                  <tr key={solicitud.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {solicitud.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {solicitud.fecha}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {solicitud.cliente}
                        </div>
                        <div className="text-sm text-gray-500">
                          {solicitud.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">
                          {solicitud.motivo}
                        </div>
                        <div className="text-sm text-gray-500">
                          {solicitud.detalle}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(solicitud.estado)}`}>
                        {solicitud.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {solicitud.importe}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {solicitud.fechaAccion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination/Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando {filteredSolicitudes.length} de {solicitudes.length} solicitudes
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  Anterior
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;