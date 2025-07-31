import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

const PORT = import.meta.env.VITE_SERVER_PORT;

// Auth Pages
import Login from './auth/pages/Login';
import Register from "./auth/pages/Register";
import ForgotPassword from "./auth/pages/ForgotPassword";

// Shop Pages
import Home from "./shop/pages/Home";
import Products from "./shop/pages/Products";
import Colecction from "./shop/pages/colecction";
import ProductDetail from "./shop/pages/ProductDetail";
import Cart from "./shop/pages/Cart";

// User Pages
import Profile from "./user/pages/Profile";
import EditUserProfile from "./user/pages/EditProfile";

// Admin Pages
import AdminDashboard from "../src/admin/pages/AdminDashboard";

import GestionDevoucion from "../src/admin/pages/GestionDevoucion";
import GestionUser from "../src/admin/pages/GestionUser";
import GestionPedidos from "../src/admin/pages/GestionPedidos"
import ProductCrud from '../src/admin/pages/ProductCrud';
import CreateProduct from '../src/admin/pages/CreateProduct';
import UpdateProduct from './admin/pages/UpdateProduct';
import UpdateUser from '../src/admin/pages/UpdateUser';
import CreateUser from "../src/admin/pages/CreateUser"
import AboutUs from './about/pages/AboutUs';
import ContactUs from './about/pages/ContactUs';
import Blogs from './about/pages/Blogs';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* About Routes */}
          <Route path='/About' element={<AboutUs />}></Route>
          <Route path='/Contact' element={<ContactUs />}></Route>
          <Route path='/Blogs' element={<Blogs />}></Route>

          {/* Auth Routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Shop Routes */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Colecction" element={<Colecction />} />
          <Route path="/Products/:id" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />

          {/* User Routes */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Edit-Profile" element={<EditUserProfile />} />

          {/* Admin Routes */}
          <Route
            path="/Dashboard"
            element={
              user && user.role === 100
                ? <AdminDashboard user={user} />
                : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/Gestion-Devolution"
            element={
              user && user.role === 100
                ? <GestionDevoucion />
                : <Navigate to="/Login" replace />
            }
          />
          <Route
            path="/Gestion-User"
            element={
              user && user.role === 100
                ? <GestionUser />
                : <Navigate to="/Login" replace />
            }
          />
          <Route
            path="/Product-Crud"
            element={
              user && user.role === 100
                ? <ProductCrud />
                : <Navigate to="/Login" replace />
            }
          />
          <Route
            path="/Products/Create"
            element={
              user?.role === 100 ? <CreateProduct /> : <Navigate to="/Login" replace />
            }
          />

          <Route
            path="/Products/Update"
            element={
              user?.role && /^1\d{2}$/.test(user.role) ? <UpdateProduct /> : <Navigate to="/Login" replace />
            }
          />
          <Route
            path="/Gestion-Pedidos"
            element={
              user?.role && /^1\d{2}$/.test(user.role) ? <GestionPedidos /> : <Navigate to="/Login" replace />
            }
          />
          <Route
            path="/Users/Update"
            element={
              user?.role && /^1\d{2}$/.test(user.role) ? <UpdateUser /> : <Navigate to="/Login" replace />
            }
          />
          <Route
            path="/Users/Create"
            element={
              user?.role && /^1\d{2}$/.test(user.role) ? <CreateUser /> : <Navigate to="/Login" replace />
            }
          />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/Home" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;