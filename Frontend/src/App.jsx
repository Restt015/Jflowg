
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'; 

const PORT = import.meta.env.VITE_SERVER_PORT;

//Auth Pages
import Login from './auth/pages/Login';
import Register from "./auth/pages/Register";
import ForgotPassword from "./auth/pages/ForgotPassword";


//Shop Pages

import Home from "./shop/pages/Home";
import Products from "./shop/pages/Products";
import Colecction from "./shop/pages/colecction";
import ProductDetail from "./shop/pages/ProductDetail";
import Cart from "./shop/pages/Cart";




//User Pages

import Profile from "./user/pages/Profile";
import EditUserProfile from "./user/pages/EditProfile";


//Admin Pages




//Shared Components






function App() {
  return (
    <CartProvider>
      
    <Router>
       
        <Routes>

      
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
         <Route path="/Forgot-password" element={<ForgotPassword />} />


      

        {/* Auth Routes */}


       

        {/* Shop Routes */}


        <Route path="/" element={<Navigate to="/Home"/>} />  
        <Route path="/Home" element={<Home />} />
        <Route path="/Products" element={<Products/>} />
        <Route path="/Colecction" element={<Colecction />} />
        <Route path="/Products/:id" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />

        
        
        

        {/* User Routes */}

        <Route path="/Profile" element={<Profile/>} />
        <Route path="/EditProfile" element={<EditUserProfile />} />

        {/* Admin Routes */}

        
        
        {/*Links Routes */}


      </Routes>

    

    </Router>
    </CartProvider>
  );
}

export default App
