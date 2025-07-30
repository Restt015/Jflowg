import React from 'react';
import { ChevronLeft, FileText, Package, Users, BarChart3, Shield } from 'lucide-react';

const AdminDashboard = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Panel de Administración</h1>
              <p className="text-sm text-gray-500">Bienvenido al sistema de gestión administrativa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
              Español
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg flex items-center gap-3">
                  <BarChart3 size={18} />
                  <span className="text-sm font-medium">Panel de Administración</span>
                </div>
              </li>
              <li>
                <button className="w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50">
                  <Package size={18} />
                  <span className="text-sm">Gestión de Productos</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50">
                  <Users size={18} />
                  <span className="text-sm">Gestión de Pedidos</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50">
                  <FileText size={18} />
                  <span className="text-sm">Gestión de Devoluciones</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-50">
                  <Shield size={18} />
                  <span className="text-sm">Gestión de Usuarios</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total Productos</h3>
                <FileText size={20} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">1,247</div>
              <div className="text-xs text-green-600">+5% vs mes anterior</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Pedidos Activos</h3>
                <Package size={20} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">89</div>
              <div className="text-xs text-green-600">+12% vs mes anterior</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Devoluciones</h3>
                <BarChart3 size={20} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">23</div>
              <div className="text-xs text-red-600">-8% vs mes anterior</div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Usuarios Activos</h3>
                <Users size={20} className="text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">2,156</div>
              <div className="text-xs text-green-600">+18% vs mes anterior</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Actividad Reciente</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Nuevo pedido procesado</p>
                    <p className="text-xs text-gray-500">Pedido #2024-001 • Hace 2 min</p>
                  </div>
                  <span className="text-xs text-gray-400">Hace 5 min</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Usuario registrado</p>
                    <p className="text-xs text-gray-500">nuevo.usuario@email.com</p>
                  </div>
                  <span className="text-xs text-gray-400">Hace 12 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ChevronLeft size={16} />
              <span className="text-sm">Continuar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
