import React, { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaBars,
  FaShoppingCart,
  FaHeart
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DialogCart from "../../shop/components/DialogCart";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const CartIcon = (
    <div className="relative">
      <button
        onClick={() => setIsCartOpen(true)}
        className="text-pink-900 hover:text-rose-600"
      >
        <FaShoppingCart className="text-[1.5rem]" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </button>
    </div>
  );

  return (
    <>
      <nav className="fixed top-6 left-0 w-full z-40 bg-rose-100 shadow-md px-6 py-4 rounded-b-lg">
        <p className="fixed top-0 left-0 w-full text-sm text-white bg-gray-400 text-center py-1 z-50">
          Envío gratis a todo el mundo
        </p>

        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/Home" className="text-gray-800 font-bold text-xl">Jflowg</Link>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FaBars className="text-gray-800 w-6 h-6" />
            </button>
          </div>

          <div className="hidden md:flex space-x-6 text-base font-medium text-gray-800">
            <Link to="/Products" className="hover:text-red-800">Catálogo</Link>
            <Link to="#" className="hover:text-red-800">Acerca de Nosotros</Link>
            <Link to="#" className="hover:text-red-800">Blog</Link>
            <Link to="#" className="hover:text-red-800">Contacto</Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-pink-900 hover:text-rose-600">
              <FaHeart className="text-[1.5rem]" />
            </button>

            {CartIcon}

            <div className="relative flex items-center justify-center" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-pink-900 hover:text-rose-600"
              >
                <FaUserCircle className="text-[1.5rem]" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded shadow-md border text-sm z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 font-semibold border-b text-gray-800">
                        {user.name} {user.lastName}
                      </div>
                      <Link to="/Profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Mi cuenta</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Cerrar sesión</button>
                    </>
                  ) : (
                    <>
                      <Link to="/Login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Iniciar sesión</Link>
                      <Link to="/Register" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Crear cuenta</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 px-4 space-y-3 text-gray-800">
            <Link to="/Articles" className="block hover:text-red-800">Catálogo</Link>
            <Link to="#" className="block hover:text-red-800">Acerca de Nosotros</Link>
            <Link to="#" className="block hover:text-red-800">Blog</Link>
            <Link to="#" className="block hover:text-red-800">Contacto</Link>

            <div className="flex justify-center items-center gap-6 mt-4">
              <button className="text-pink-900 hover:text-rose-600">
                <FaHeart className="text-[1.5rem]" />
              </button>
              {CartIcon}

              <div className="relative flex items-center justify-center" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-pink-900 hover:text-rose-600"
                >
                  <FaUserCircle className="text-[1.5rem]" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-white rounded shadow-md border text-sm z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-2 font-semibold border-b text-gray-800">{user.name} {user.lastName}</div>
                        <Link to="/Profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Mi cuenta</Link>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Cerrar sesión</button>
                      </>
                    ) : (
                      <>
                        <Link to="/Login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Iniciar sesión</Link>
                        <Link to="/Register" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Crear cuenta</Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <DialogCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;
