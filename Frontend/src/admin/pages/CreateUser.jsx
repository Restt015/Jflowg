import React, { useState } from 'react';
import { X, Mail, Check, Trash2 } from 'lucide-react';

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
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Cliente'
  });
  const [lastCreatedUser, setLastCreatedUser] = useState(null);

  // Contadores
  const totalUsers = users.length;
  const verifiedUsers = users.filter(user => user.status === 'Verificado').length;
  const pendingUsers = users.filter(user => user.status === 'Pendiente').length;

  const generateTempPassword = () => {
    return Math.random().toString(36).substring(2, 12);
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) return;

    const tempPassword = generateTempPassword();
    const createdUser = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Pendiente',
      createdDate: new Date().toISOString().split('T')[0],
      tempPassword: tempPassword
    };

    setUsers([...users, createdUser]);
    setLastCreatedUser(createdUser);
    setNewUser({ name: '', email: '', role: 'Cliente' });
    setShowCreateModal(false);
    setShowSuccessModal(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const resetEmailAction = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, tempPassword: generateTempPassword() }
        : user
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-semibold text-gray-800">Panel de Administración</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span className="text-lg">+</span>
              Crear Usuario
            </button>
          </div>
          <p className="text-gray-600 text-sm">Gestión de cuentas de usuario</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Usuarios Registrados</h2>
          <div className="flex gap-6 text-sm">
            <span className="text-gray-600">Total: <span className="font-medium">{totalUsers} usuarios</span></span>
            <span className="text-gray-600">Verificados: <span className="font-medium text-blue-600">{verifiedUsers}</span></span>
            <span className="text-gray-600">Pendientes: <span className="font-medium text-orange-600">{pendingUsers}</span></span>
          </div>
        </div>

        {/* Users Table */}
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
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{user.role}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{user.createdDate}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 font-mono">{user.tempPassword}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => resetEmailAction(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        Reenviar Email
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
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
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Crear Nueva Cuenta</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Ingresa el nombre completo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="usuario@ejemplo.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-gray-100"
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderador">Moderador</option>
                </select>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                  <div className="text-red-600 mt-0.5">ℹ</div>
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-1">Información importante:</p>
                    <p className="mb-1">Se generará una contraseña temporal automáticamente</p>
                    <p className="mb-1">El usuario debe finalizar el proceso de verificación de usuario antes de poder acceder</p>
                    <p className="mb-1">El usuario debe verificar su cuenta antes de poder acceder</p>
                    <p>La contraseña temporal expira en 24 horas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                disabled={!newUser.name || !newUser.email}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && lastCreatedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-white" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Usuario Creado Exitosamente
            </h2>
            <p className="text-gray-600 mb-6">
              La cuenta ha sido creada y se ha enviado un email de verificación
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-medium text-gray-900 mb-3">Detalles de la cuenta:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-medium">{lastCreatedUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{lastCreatedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rol:</span>
                  <span className="font-medium">{lastCreatedUser.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contraseña temporal:</span>
                  <span className="font-mono font-medium">{lastCreatedUser.tempPassword}</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <Mail size={16} className="text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium mb-1">Email enviado a:</p>
                  <p>El usuario debe verificar su cuenta haciendo clic en el enlace del email antes de poder acceder al sistema</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setLastCreatedUser(null);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementSystem;