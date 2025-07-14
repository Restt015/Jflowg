import { useState } from "react";
import { registerUser } from "../../services/userService";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Usuario registrado exitosamente");
      window.location.href = '/Home';
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 flex flex-col items-center justify-center px-4 py-10 font-orbitron">
      {/* Logo */}
      <h1 className="text-4xl text-red-700 mb-1">JFLOWG</h1>
      <p className="text-sm text-gray-600 mb-3">Crea tu cuenta nueva</p>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 md:p-8 rounded-2xl shadow-md space-y-5 border border-rose-200"
      >
        <h2 className="text-xl text-gray-800 mb-1">Crear Cuenta</h2>
        <p className="text-sm text-gray-500 mb-4">
          Completa tus datos para registrarte
        </p>

        {/* Nombre y Apellido */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="text-xs text-gray-600 block mb-1">Nombre</label>
            <div className="flex items-center border border-[#FEE2E2] rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-rose-300 transition">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full text-sm focus:outline-none"
                placeholder="Tu nombre"
                required
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label className="text-xs text-gray-600 block mb-1">Apellido</label>
            <div className="flex items-center border border-[#FEE2E2] rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-rose-300 transition">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full text-sm focus:outline-none"
                placeholder="Tu apellido"
                required
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-gray-600 block mb-1">Email</label>
          <div className="flex items-center border border-[#FEE2E2] rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-rose-300 transition">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full text-sm focus:outline-none"
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>

        {/* Contraseña */}
        <div>
          <label className="text-xs text-gray-600 block mb-1">Contraseña</label>
          <div className="flex items-center border border-[#FEE2E2] rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-rose-300 transition">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full text-sm focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label className="text-xs text-gray-600 block mb-1">Confirmar Contraseña</label>
          <div className="flex items-center border border-[#FEE2E2] rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-rose-300 transition">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full text-sm focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Aceptar términos */}
        <div className="flex items-start gap-2 text-xs">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="accent-red-600 mt-1"
            required
          />
          <span>
            Acepto términos y condiciones{" "}
            <a href="#" className="text-red-500 hover:underline">
              Leer términos
            </a>
          </span>
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-2xl hover:bg-red-700 transition"
        >
          Crear Cuenta
        </button>

        {/* Divider social */}
        <div className="text-center text-sm text-gray-600 mt-4">
          O regístrate con
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-[#FEE2E2] py-2 rounded-2xl text-sm hover:shadow-md transition"
          >
            <FaGoogle className="text-red-500" />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-[#FEE2E2] py-2 rounded-2xl text-sm hover:shadow-md transition"
          >
            <FaFacebook className="text-blue-600" />
            Facebook
          </button>
        </div>

        {/* Ir a login */}
        <p className="text-center text-xs text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-red-600 hover:underline font-medium">
            Inicia sesión aquí
          </Link>
        </p>
      </form>{/* Footer */}
      <footer className="text-center text-xs text-gray-500 mt-6">
        © 2024 JFLOWG. Todos los derechos reservados.
      </footer>
      
    </div>
    
  );
}
