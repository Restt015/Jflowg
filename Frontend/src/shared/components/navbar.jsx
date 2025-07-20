import React, { useState } from "react";
import { FaUser, FaUserPlus, FaBars, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import Cart from '../../shop/pages/Cart'
=======
import DialogCart from "../../shop/components/DialogCart";
>>>>>>> 85c84f41ca7b0a61d315de84e647afac7c7ab2ce

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-6 left-0 w-full z-40 bg-rose-100 shadow-md px-6 py-4 rounded-b-lg">
        <p className="fixed top-0 left-0 w-full text-sm text-white bg-gray-400 text-center py-1 z-50">
          Envío gratis a todo el mundo
        </p>

        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/Home" className="text-gray-800 font-bold text-xl">Jflowg</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FaBars className="text-gray-800 w-6 h-6" />
            </button>
          </div>

          <div className="hidden md:flex space-x-6 text-base font-medium text-gray-800">
            <Link to="/Articles" className="hover:text-red-800">Catálogo</Link>
            <a href="#" className="hover:text-red-800">Acerca de Nosotros</a>
            <a href="#" className="hover:text-red-800">Blog</a>
            <a href="#" className="hover:text-red-800">Contacto</a>
          </div>
<<<<<<< HEAD
         <div className="hidden md:flex items-center space-x-6">
  <div className="relative">
    <input
      className="border border-gray-300 bg-white h-10 pl-3 pr-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm"
      type="search"
      placeholder="Búsqueda"
    />
    <button type="submit" className="absolute right-3 top-2.5">
      <svg
        className="text-gray-600 h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 4.47l4.58 4.58a1 1 0 01-1.42 1.42l-4.58-4.58A6 6 0 012 8z" />
      </svg>
    </button>
  </div>
  <Link to="/Login" className="flex items-center gap-2 bg-white text-pink-900 hover:bg-pink-50 hover:text-pink-900 text-sm px-4 py-2 rounded-md transition duration-200 shadow-sm">
  <FaUser /> Iniciar sesión 
</Link>
<Link to="/Register" className="flex items-center gap-2 bg-white text-pink-900 hover:bg-pink-50 hover:text-pink-900 text-sm px-4 py-2 rounded-md transition duration-200 shadow-sm">
  <FaUser /> Crear Cuenta
</Link>
  <Cart />
</div>
       </div>     
=======

          <div className="hidden md:flex items-center space-x-6">
            {/* Búsqueda */}
            <div className="relative">
              <input
                className="border border-gray-300 bg-white h-10 pl-3 pr-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm"
                type="search"
                placeholder="Búsqueda"
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <svg
                  className="text-gray-600 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 4.47l4.58 4.58a1 1 0 01-1.42 1.42l-4.58-4.58A6 6 0 012 8z" />
                </svg>
              </button>
            </div>

            {/* Login/Register */}
            <Link
              to="/Login"
              className="flex items-center gap-2 bg-white text-pink-900 hover:bg-pink-50 text-sm px-4 py-2 rounded-md transition duration-200 shadow-sm"
            >
              <FaUser /> Iniciar sesión
            </Link>
            <Link
              to="/Register"
              className="flex items-center gap-2 bg-white text-pink-900 hover:bg-pink-50 text-sm px-4 py-2 rounded-md transition duration-200 shadow-sm"
            >
              <FaUserPlus /> Crear Cuenta
            </Link>

            {/* Carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 text-pink-900 hover:bg-white hover:text-pink-900 text-sm px-4 py-2 rounded-md transition duration-200 shadow-sm"
            >
              <FaShoppingCart /> 
            </button>

            {/* Favoritos */}
          <button className="flex items-center gap-2 text-pink-900 hover:bg-pink-50 hover:text-pink-900 text-sm px-4 py-2 rounded-md transition duration-200 shadow-sm"
          >
             <FaHeart /> 
          </button>


          </div>
        </div>

        {/* Menú móvil */}
>>>>>>> 85c84f41ca7b0a61d315de84e647afac7c7ab2ce
        {isOpen && (
          <div className="md:hidden mt-4 px-4 space-y-3 text-gray-800">
            <a href="#" className="block hover:text-red-800">Novedades</a>
            <a href="#" className="block hover:text-red-800">Hombre</a>
            <a href="#" className="block hover:text-red-800">Mujer</a>
            <a href="#" className="block hover:text-red-800">Accesorios</a>

            <div className="relative mt-2">
              <input
                className="border border-gray-300 bg-white w-full h-10 pl-3 pr-8 rounded-md text-sm focus:outline-none"
                type="search"
                placeholder="Búsqueda"
              />
              <button type="submit" className="absolute right-3 top-2">
                <svg className="text-gray-600 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 4.47l4.58 4.58a1 1 0 01-1.42 1.42l-4.58-4.58A6 6 0 012 8z" />
                </svg>
              </button>
            </div>

            <div className="flex flex-row justify-center space-x-8 mt-2">
              <a href="#" className="block text-sm flex items-center space-x-1 hover:text-red-800">
                <FaUser /> <span>Iniciar sesión</span>
              </a>
              <a href="#" className="block text-sm flex items-center space-x-1 hover:text-red-800">
                <FaUserPlus /> <span>Crear cuenta</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* DialogCart Component */}
      <DialogCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;
