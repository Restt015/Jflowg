import React, { useState } from 'react';
import { X, Mail, Check, Trash2 } from 'lucide-react';
import AdminSidebar from "../components/shared/AdminSidebar";

const UserManagementSystem = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Cesar Restrepo',
      email: 'cesar@gmail.com',
      role: 'Cliente',
      status: 'Pendiente',
      createdDate: '2025-06-23',
      tempPassword: 'HU86n4aJJT'
    },
    {
      id: 2,
      name: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@gmail.com',
      role: 'Cliente',
      status: 'Pendiente',
      createdDate: '2024-01-16',
      tempPassword: 'temp123456'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Cliente' });
  const [lastCreatedUser, setLastCreatedUser] = useState(null);

  const totalUsers = users.length;
  const verifiedUsers = users.filter(user => user.status === 'Verificado').length;
  const pendingUsers = users.filter(user => user.status === 'Pendiente').length;

  const generateTempPassword = () => Math.random().toString(36).substring(2, 12);

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) return;
    const createdUser = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Pendiente',
      createdDate: new Date().toISOString().split('T')[0],
      tempPassword: generateTempPassword()
    };
    setUsers([...users, createdUser]);
    setLastCreatedUser(createdUser);
    setNewUser({ name: '', email: '', role: 'Cliente' });
    setShowCreateModal(false);
    setShowSuccessModal(true);
  };

  const handleDeleteUser = (userId) => setUsers(users.filter(user => user.id !== userId));
  const resetEmailAction = (userId) => setUsers(users.map(user => (
    user.id === userId ? { ...user, tempPassword: generateTempPassword() } : user
  )));

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-semibold text-gray-800">Gestión de Usuarios</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span className="text-lg">+</span> Crear Usuario
            </button>
          </div>
          <p className="text-gray-600 text-sm">Gestión de cuentas de usuario</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Usuarios Registrados</h2>
          <div className="flex gap-6 text-sm">
            <span className="text-gray-600">Total: <span className="font-medium">{totalUsers}</span></span>
            <span className="text-gray-600">Verificados: <span className="font-medium text-blue-600">{verifiedUsers}</span></span>
            <span className="text-gray-600">Pendientes: <span className="font-medium text-orange-600">{pendingUsers}</span></span>
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">USUARIO</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ROL</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ESTADO</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">FECHA CREACIÓN</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">CONTRASEÑA TEMPORAL</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full text-white text-sm font-medium flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{user.role}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">{user.status}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{user.createdDate}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 font-mono">{user.tempPassword}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => resetEmailAction(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Reenviar Email
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserManagementSystem;
